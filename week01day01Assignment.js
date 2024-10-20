
//Learn var vs let vs const and understand variable scoping
const browserVersion = 'Chrome'

function getBrowserVersion() { 
    var browserVersion = 'Firefox'
  if(browserVersion === 'Chrome') {
    let browserVersion = 'Edge'
    console.log(browserVersion)
  }
    console.log(browserVersion)
}

getBrowserVersion()
console.log(browserVersion)