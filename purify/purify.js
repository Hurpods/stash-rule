const url = $request.url;

let body = JSON.parse($response.body);

// 识货首页tab净化
if (url.includes("v4/services/sh-appapi/home/info/v1")) {
    if (body.data) {
        body.data.hotspot.list = []
        body.data.search_arr.list = []
        body.data.new_activity = []
        body.data.tab = body.data.tab.filter(item => {
            item.name === "推荐"
        })
        body.data.zone = body.data.zone.filter(item => {
            item.id === 1 || item.id === 4 || item.id === 126 || item.id === 84
        })
    }
    // 识货我的页净化
} else if (url.includes("v4/services/sh-appapi/center/config")) {
    if (body.data) {
        body.data.tool_list = []
        body.data.navigation_list = []
    }
    // 得物首页净化
} else if (url.includes("sns-rec/v1/du-tab")) {
    if (body.data) {
        body.data.second = body.data.second.filter(item => {
            item.cId === "200000"
        });
        body.data.secondMoreV2 = body.data.secondMoreV2.filter(item => {
            item.cId === "200000"
        });
    }
    // 得物探索页净化
} else if (url.includes("identify-discovery/v1/discovery/index")) {
    if (body.data) {
        body.data.tabNum = 0
        body.data.flagNotice = 0
        body.data.groups = body.data.groups.filter(item => {
            item.groupId === 1 || item.groupId === 4
        })
        body.data.groups.forEach(element => {
            element.items[0].subtitle = ""
            element.items[0].iconV2 = ""
        });
    }
    // 得物我的页净化
} else if (url.includes("app/biz-aggregate/me/user-index")) {
    if (body.data) {
        body.data.modules = body.data.modules.filter(item => {
            item.key === "userHeader" || item.key === "order" || item.key === "leadTools"
        })
    }
    // 滴滴首页tab净化
} else if (url.includes("homepage/v1/core")) {
    if (body.data) {
        body.data.disorder_cards.bottom_nav_list.data = body.data.disorder_cards.bottom_nav_list.data.filter(item => {
            item.id === "home_page" || item.id === "user_center"
        })
        const allowType = ["dache_anycar","carmate","driverservice","bike","nav_more_v3"]
        body.data.order_cards.nav_list_card.data = body.data.order_cards.nav_list_card.data.filter(item => {
            allowType.includes(item.nav_id)
        })
        body.data.order_cards.nav_list_card.extension.nav_id_list = "dache_anycar,carmate,driverservice,bike,nav_more_v3"
        body.data.common_params.nav_id_list = body.data.order_cards.nav_list_card.extension.nav_id_list
    }
    // 滴滴首页tab净化
} else if (url.includes("homepage/v1/other/fast")) {
    if (body.data.disorder_cards?.communicate_card) {
        body.data.disorder_cards.communicate_card = {}
    }
    if (body.data.order_cards) {
        body.data.order_cards={}
    }
}

body = JSON.stringify(body);

$done({
    body
});