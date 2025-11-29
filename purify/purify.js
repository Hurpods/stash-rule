const url = $request.url;

let body = JSON.parse($response.body);


if (url.includes("")) {

}

body = JSON.stringify(body);

$done({
    body
});