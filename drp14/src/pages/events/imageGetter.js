async function getImages(event) {
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: event.images }),
  };

  const response = await fetch("/get_images", params);
  const body = await response.json();

  if (response.status !== 200) {
    alert(body.message);
    return;
  }
  return body.images;
}

export default getImages;
