import NotFoundContent from "@/components/custom/NotFoundContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found"
}

export default async function NotFound() {
  return (
    <>
      <NotFoundContent/>
    </>
  )
}
