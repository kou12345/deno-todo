export function Signup() {
  return (
    <div className="w-3/4 mx-auto">
      <form
        className="flex flex-col"
        method="post"
        action="/api/signup"
      >
        user name:{" "}
        <input className="border" type="text" name="username" required />
        password:{" "}
        <input className="border" type="password" name="password" required />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
