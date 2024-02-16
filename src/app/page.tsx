import Image from "next/image";
import axios from "axios";
import Link from "next/link";
axios.defaults.baseURL="http://localhost:3000";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
    <h1 className="bg-blue-700 p-3 rounded-lg font-bold text-white hover:bg-blue-400 hover:outline-yellow-500 border-3 border-yellow-500">
      <Link href="/todos">Visit To application</Link>
    </h1>
  </main>
  
  );
}
