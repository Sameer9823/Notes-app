'use client';

import { useRouter } from "next/navigation";



function Login() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/products/123/sample-product');
    }
    const handleback = () => {
        router.back();
    }
  return (
    <div>
        <button onClick={handleClick}>Go to Products</button>
        <button onClick={handleback} className="ml-4">Go Back</button>
    </div>
  )
}

export default Login