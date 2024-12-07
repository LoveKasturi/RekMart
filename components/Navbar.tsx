import Link from "next/link";
import { RainbowButton } from "./ui/rainbow-button";
import Image from "next/image";
import Logo from "@/public/logo.png";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Rek<span className="text-blue-500">Mart</span>
        </h3>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
