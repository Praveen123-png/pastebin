import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen gap-5">
      <h1 className="text-3xl px-3 text-center">Write your message below:</h1>

      <textarea
        name="paste"
        id="paste"
        cols={30}
        rows={5}
        className="border border-white rounded-lg p-2"
      ></textarea>

      <button className="bg-white rounded-lg text-black p-2 hover:bg-gray-200 cursor-pointer transition-color duration-300 active:bg-gray-300">
        Create URL
      </button>

      <p className="text-center px-3">
        Click the &quot;Click Url&quot; button to create an url for your message
      </p>

      <Link
        href="/api/pastes"
        className="bg-white rounded-lg text-black p-2 hover:bg-gray-200 cursor-pointer transition-color duration-300 active:bg-gray-300"
      >
        View all pastes
      </Link>
    </section>
  );
}
