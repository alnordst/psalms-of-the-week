Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

let week = (new Date()).getWeek()
if(week < 2) week = 2
if(week > 51) week = 51
let n = (week-2) * 3 + 1

let api = 'https://esv-bible.deno.dev/v3/passage/html'
let query = [
    `q=Psalm+${n}-${n+2}`,
    'include-verse-numbers=false',
    'include-first-verse-numbers=false',
    'include-footnotes=false',
    'include-audio-link=false'
]
fetch(`${api}?${query.join('&')}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerHTML=data.passages[0]
    })
    .catch(err => {
        console.log(err)
        document.getElementById('output').innerHTML=error
    })