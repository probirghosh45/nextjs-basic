// export default function Home() {
//   return (
//     <main>
//           Hi
//     </main>
//   )
// }

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className="text-center text-3xl mt-8">Hi, Welcome to the Home Page!</h1>
    </main>
  );
}
