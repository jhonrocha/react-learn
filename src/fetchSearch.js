export default async function fetchSearch({ queryKey }) {
  const [, { animal, location, breed }] = queryKey;
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );
  if (!res.ok) {
    throw new Error(
      `/pets?animal=${animal}&location=${location}&breed=${breed} not ok`,
    );
  }
  return res.json();
}
