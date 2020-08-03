export function partQntt(diaDict) {
    // {
    //     "main": "G1",
    //     "sub": "SEG01",
    //     "name": "web plate",
    //     "w": 1000,
    //     "t": 20,
    //     "l": 2000,
    //     "q": 1,
    //     "wg": 314,
    //     "mat": "HSB500"
    // },
    let data = [];
    for (let key in diaDict) {
        let main = key.substr(0, 2);
        let sub = key.substr(2);
        for (let part in diaDict[key]) {
            if (diaDict[key][part]["points"]) {
                let points = diaDict[key][part]["points"];
                let name = part;
                let t = diaDict[key][part]["Thickness"];
                let l = 0;
                let area = 0;
                let index1 = 0;

                // 가장 긴 변에 대해서 중심축을 잡음
                for (let i = 0; i < points.length; i++) {
                    let k = i === points.length - 1 ? 0 : i + 1;
                    let dummyL = lengthPt(points[i], points[k])
                    if (dummyL > l) {
                        l = dummyL;
                        index1 = i
                    }
                    area += (points[k].x - points[i].x) * (points[i].y + points[k].y)/2
                }
                let index2 = index1 === points.length - 1 ? 0 : index1 + 1
                let ang = Math.atan2(points[index2].y - points[index1].y, points[index2].x - points[index1].x)
                let cos = Math.cos(ang);
                let sin = Math.sin(ang);
                let xList = [];
                let yList = [];
                for (let i = 0; i < points.length; i++) {
                    xList.push(points[i].x * cos - points[i].y * sin);
                    yList.push(points[i].x * sin + points[i].y * cos);
                }
                let maxX = Math.max(...xList);
                let minX = Math.min(...xList);
                let maxY = Math.max(...yList);
                let minY = Math.min(...yList);
                let length = maxX - minX;
                let width = maxY - minY;
                let weight = area * t * 0.000007850;
                let loss = (length * width - area) / (length * width) * 100
                // 추후 재료에 대한 정보도  part 정보에 추가되어야 함.
                data.push(
                    {
                        "main": main,
                        "sub": sub,
                        "name": name,
                        "w": width.toFixed(0),
                        "t": t,
                        "l": length.toFixed(0),
                        "q": loss,
                        "wg": weight.toFixed(1),
                        "mat": "HSB500"
                    }
                )
            }
        }
    }
    return data
}

function lengthPt(pt1, pt2) {
    let length = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
    return length
}