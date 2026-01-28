'use client'

import { useParams } from "next/navigation";

function Products() {
    const params = useParams();

  return (
    <div>{params.id} - {params.slug}</div>
  )
}

export default Products