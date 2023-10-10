async function main(){
    let res = await fetch('/leaderboard')
    res = await res.json()
    console.log(res)
    for(let i = 0; i < res.length; i++){
        let mainDiv = document.createElement('div')
        mainDiv.classList.add('entry')
        if(i == 0) mainDiv.classList.add('num1')

        let sec1 = document.createElement('div')
        sec1.classList.add('section')
        let number = document.createElement('div')
        number.classList.add('number')
        number.innerText = '#' + (i+1)
        let name = document.createElement('div')
        name.classList.add('name')
        name.innerText = res[i]['Name']
        sec1.appendChild(number)
        sec1.appendChild(name)
        mainDiv.appendChild(sec1)

        let sec2 = document.createElement('div')
        sec2.classList.add('section')
        let score = document.createElement('div')
        score.classList.add('score')
        score.innerText = res[i]['Score']
        let pts = document.createElement('div')
        pts.classList.add('pts')
        pts.innerText = 'PTS'
        sec2.appendChild(score)
        sec2.appendChild(pts)
        mainDiv.appendChild(sec2)
    
        document.querySelector('.leaderboard').appendChild(mainDiv)
    }
}

main()