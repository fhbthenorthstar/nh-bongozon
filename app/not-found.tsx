import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] grid place-items-center bg-[#111214] p-6">
      <div className="max-w-xl text-center">
        <Image
          src="/404.png" // put the raccoon TV image in /public
          alt="একটি টিভির স্ক্রিনে র‍্যাকুন"
          width={520}
          height={372}
          priority
          className="mx-auto h-auto"
        />

        <h1 className="mt-6 text-2xl font-extrabold text-white">
          ৪০৪ — পেজটি পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-white/75">
          আমাদের কাছে এই পেজটি নেই — লিংকটা আপনাকে কে দিল?
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-md hover:brightness-105 bg-gradient-to-b from-[#8AE233] to-[#66C214]"
        >
          হোমপেজে যান
        </Link>
      </div>
    </main>
  );
}
