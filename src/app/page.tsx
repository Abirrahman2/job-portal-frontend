
import Image from "next/image";
import BlurText from "./ui/Home/BlurText";
import { Redirect } from "next";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/home");
}
