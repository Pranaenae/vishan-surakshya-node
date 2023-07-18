import { oauth2Client } from "../../config/google.OAuth";
import axios from "axios";
export async function getGoogleAuthURL() {
  /*
   * Generate a url that asks permissions to the user's email and profile
   */
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const result = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    response_type: "code",
    scope: scopes, // If you only need one scope you can pass it as string
  });
  console.log({ result });
  return result;
}

export async function getGoogleUser(code: any) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log({ tokens });

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
  console.log({ googleUser });

  return googleUser;
}
