#!/usr/bin/env bash
#
# Rolling deploy sem downtime.
#
# Recria as réplicas do portfólio UMA DE CADA VEZ, esperando cada uma ficar
# "healthy" (via HEALTHCHECK do Dockerfile) antes de seguir para a próxima.
# Assim nunca há uma janela em que todas estão fora — o nginx sempre tem ao
# menos uma réplica viva para atender. Se uma réplica nova não estabilizar, o
# deploy aborta sem ter tocado nas demais.
#
# Uso:
#   ./scripts/deploy.sh
# Variáveis opcionais:
#   HEALTH_TIMEOUT  segundos de espera por réplica até desistir (padrão: 120)

set -euo pipefail

# Roda a partir da raiz do projeto, independente de onde o script foi chamado.
cd "$(dirname "$0")/.."

# Mapeamento "serviço do compose : nome do container".
REPLICAS=(
  "app1:portfolio-application-1"
  "app2:portfolio-application-2"
)
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-120}"

log() { printf '\033[36m[deploy]\033[0m %s\n' "$*"; }
err() { printf '\033[31m[deploy] ERRO:\033[0m %s\n' "$*" >&2; }

# Aguarda um container reportar health=healthy, com timeout.
wait_healthy() {
  local container="$1" timeout="$2" waited=0 status
  while true; do
    status="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$container" 2>/dev/null || echo "missing")"
    case "$status" in
      healthy) log "  → $container está healthy"; return 0 ;;
      missing) err "container $container não existe"; return 1 ;;
      none)    err "container $container não tem HEALTHCHECK definido"; return 1 ;;
    esac
    if (( waited >= timeout )); then
      err "$container não ficou healthy em ${timeout}s (status atual: $status)"
      return 1
    fi
    sleep 3
    waited=$((waited + 3))
  done
}

log "Buildando imagem portfolio:latest..."
docker compose build app1

for entry in "${REPLICAS[@]}"; do
  service="${entry%%:*}"
  container="${entry##*:}"
  log "Atualizando réplica: ${service} (${container})"
  # --no-deps: não mexe no nginx nem nas outras réplicas.
  # --force-recreate: garante a troca mesmo se o compose achar que "nada mudou".
  docker compose up -d --no-deps --force-recreate "$service"
  if ! wait_healthy "$container" "$HEALTH_TIMEOUT"; then
    err "Deploy abortado. As demais réplicas NÃO foram tocadas."
    exit 1
  fi
done

log "Deploy concluído com sucesso — todas as réplicas saudáveis."
