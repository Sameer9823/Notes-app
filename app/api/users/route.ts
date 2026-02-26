


let users = [
    { id: 1, name: "Alice", email: "tJx6w@example.com" },
    { id: 2, name: "Bob", email: "K1TtB@example.com" },
    { id: 3, name: "Charlie", email: "l2CtI@example.com" },
]

export async function GET(request: Request) {
    return new Response(JSON.stringify(users), {
        headers: { "Content-Type": "application/json" },
    })
}