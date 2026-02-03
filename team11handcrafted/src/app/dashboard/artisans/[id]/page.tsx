export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      Artisan ID: {params.id}
    </div>
  )
}
