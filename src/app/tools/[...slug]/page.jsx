// /src/app/tool/[...slug]/page.jsx
import Tool from "@/components/toolPage/Tool"
import { tools } from "@/data"

export default async function page({ params }) {
  // Await params before using its properties
  const { slug } = await params
  // Get the tool data based on slug
  const tool = tools.find((p) => p.slug === slug[0])

  if (!tool) {
    return <div>Tool not found</div>
  }

  return <Tool tool={tool} />
}

// Optional: Generate static params for better performance
export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: [tool.slug],
  }))
}
