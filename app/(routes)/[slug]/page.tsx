import PageHeader from "@/app/_shared/components/page-header"

export default function ClientPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <div className="container">
        <PageHeader title={params.slug} />
      </div>
    </main>
  )
}
