import axios from "axios";

try {
  const res = await axios.get("https://dummyjson.com/users");
  const users = res.data.users;
  for (let i = 0; i < users.length; i++) {
    try {
      const { email, username, password } = users[i];
      axios.post("http://localhost:3000/api/auth/signup", {
        email,
        username,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  }
} catch (err) {
  console.error(err);
}
