import React from "react";

function AuthForm({ title, form, setForm, handleSubmit, alternateLink, alternateText }) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>

        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {title}
        </button>

        <p className="text-sm mt-2 text-center">
          {alternateText}{" "}
          <a className="text-blue-600 underline" href={alternateLink}>
            Click here
          </a>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
