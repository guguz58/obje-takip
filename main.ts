function Cizgiyoksa () {
    if (lastpos < 155) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, minspeed)
    } else if (lastpos > 165) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, minspeed)
    }
}
function Cizgivarsa () {
    pos = huskylens.readeArrow(1, Content2.xOrigin)
    if (pos >= 155 && pos <= 165) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, maxspeed)
    } else if (pos < 155) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, minspeed)
    } else if (pos > 165) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, minspeed)
    }
    lastpos = pos
}
let pos = 0
let lastpos = 0
let minspeed = 0
let maxspeed = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
maxspeed = 70
minspeed = 10
basic.forever(function () {
    huskylens.request()
    if (huskylens.isLearned(1)) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
            Cizgivarsa()
        } else {
            Cizgiyoksa()
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
