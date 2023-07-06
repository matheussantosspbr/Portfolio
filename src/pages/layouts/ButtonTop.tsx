export default function ButtonTop() {
  function scrollToTop() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function test() {
    console.log("clicou");
  }
  console.log("Testing");
  console.log(1+2)

  return (
    <button
      type="button"
      onClick={test}
      className="fixed bottom-10 right-10 text-cyan-500 flex items-center justify-center animate-bounce bg-[#0B0F13] w-[3.25rem] h-[3.25rem] border-2 border-cyan-500 rounded-full"
    >
      <i className="fa-solid fa-arrow-up text-2xl"></i>
    </button>
  );
}
