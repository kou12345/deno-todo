export function Signup() {
  return (
    <div className="w-3/4 mx-auto">
      <form
        className="flex flex-col items-center"
        method="post"
        action="/api/signup"
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">UserName</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="Password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>

        <button className="my-6" type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
