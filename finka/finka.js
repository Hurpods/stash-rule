const url = $request.url;

let body = JSON.parse($response.body);

if (url.includes("feed/v5")) {
    if (body.data?.list) {
        body.data.list = body.data.list.filter(item =>
            item.type !== "ShowCase" &&
            item.type !== "PostSpecialExposure" &&
            item.showAlohaBtn !== true &&
            item.postBoostInfo === undefined
        )
        console.log("去除推荐流广告")
    }
} else if (url.includes("vas/nearby/v2")) {
    body.data.vipRequired = false;
    body.data.superboostList = []
    body.data.list.forEach(element => {
        element.hide = false;
    });
    console.log("去除vip")
}

body = JSON.stringify(body);

$done({
    body
});