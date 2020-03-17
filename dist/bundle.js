(function (global) {
  'use strict';

  // ["horizon", "vertical", "superElevation" ,"girderLayoutInput", "SEShape", "girderBaseInfo" , "xbeamLayout", "xbeamSectionList", "diaphragmLayout", "diaphragmSectionList", "vStiffLayout", "vStiffSectionList", "hBracingLayout", "hBracingSectionList", ]

  // 테스트용 ... 다른곳에서 건드리지 말것 ....
  // 건드리더라도 read-only , 내부  값 바꾸지 말것 ...
  // multiLineStringComp 에서 shallow copy 중

  const defaultValues = {
    horizon: [
      [178551192.87, 552443319.55, 0, 0, 0],
      [178321130.9, 552413588.4, 200000, 100000, 100000],
      [178264931.8, 551804205.7, 200000, 100000, 90000],
      [178142699.05, 551723237.52, 0, 0, 0]
    ],
    vertical: [
      { name: 1, station: 0.0, elevation: 15421.0, curveLength: 0.0 },
      { name: 2, station: 140000.0, elevation: 15632.0, curveLength: 100000.0 },
      { name: 3, station: 540000.0, elevation: 17632.0, curveLength: 80000.0 },
      { name: 4, station: 820000.0, elevation: 19592.0, curveLength: 120000.0 },
      { name: 5, station: 1260000.0, elevation: 27072.0, curveLength: 120000.0 },
      { name: 6, station: 1650000.0, elevation: 30979.7, curveLength: 240000.0 },
      { name: 7, station: 1990000.0, elevation: 20439.7, curveLength: 100000.0 },
      { name: 8, station: 2180000.0, elevation: 19869.7, curveLength: 0.0 },
      { name: 9, station: 2373000.14, elevation: 17552.0, curveLength: 0.0 }
    ],
    superElevation: [
      { name: 1, station: 700000.0, left: 7.0, right: -7.0 },
      { name: 2, station: 720000.0, left: 7.0, right: -7.0 },
      { name: 3, station: 740000.0, left: 5.0, right: -5.0 },
      { name: 4, station: 760000.0, left: 3.0, right: -3.0 },
      { name: 5, station: 780000.0, left: 2.0, right: -2.0 },
      { name: 6, station: 814500.0, left: 2.0, right: -2.0 },
      { name: 7, station: 820000.0, left: 0.36, right: -0.36 },
      { name: 8, station: 821000.0, left: 0.2, right: -0.2 },
      { name: 9, station: 831200.0, left: -1.47, right: 1.47 },
      { name: 10, station: 834200.0, left: -1.96, right: 1.96 },
      { name: 11, station: 838000.0, left: -2.58, right: 2.58 },
      { name: 12, station: 840000.0, left: -2.91, right: 2.91 },
      { name: 13, station: 841500.0, left: -3.15, right: 3.15 },
      { name: 14, station: 860000.0, left: -6.18, right: 6.18 },
      { name: 15, station: 880000.0, left: -7.0, right: 7.0 },
      { name: 16, station: 1081000.0, left: -7.0, right: 7.0 },
      { name: 17, station: 1100000.0, left: -4.3, right: 4.3 },
      { name: 18, station: 1103000.0, left: -3.76, right: 3.76 },
      { name: 19, station: 1120000.0, left: -0.7, right: 0.7 },
      { name: 20, station: 1123500.0, left: -0.07, right: 0.07 },
      { name: 21, station: 1124500.0, left: 0.11, right: -0.11 },
      { name: 22, station: 1140000.0, left: 2.0, right: -2.0 },
      { name: 23, station: 1440000.0, left: 2.0, right: -2.0 },
      { name: 24, station: 1442600.0, left: 2.26, right: -2.26 },
      { name: 25, station: 1445500.0, left: 2.55, right: -2.55 },
      { name: 26, station: 1446000.0, left: 2.6, right: -2.6 },
      { name: 27, station: 1447700.0, left: 2.77, right: -2.77 },
      { name: 28, station: 1460000.0, left: 4.0, right: -4.0 },
      { name: 29, station: 1480000.0, left: 5.0, right: -6.0 },
      { name: 30, station: 1492000.0, left: 7.0, right: -7.0 },
      { name: 31, station: 1620000.0, left: 7.0, right: -7.0 }
    ],
    beginStation: 769452.42,
    slaveOrMaster: true,

    
    girderLayoutInput: {
      baseValue: {
        bridgeBeginStation: 1208150
      },
      supportData: [
        { name: "시점", angle: 90, spanlength: 0 },
        { name: "A1", angle: 90, spanLength: 700 },
        { name: "P1", angle: 90, spanLength: 55000 },
        // { name: "P2", angle: 90, spanLength: 55000 },
        // { name: "P3", angle: 90, spanLength: 60000 },
        // { name: "P4", angle: 90, spanLength: 60000 },
        // { name: "P5", angle: 90, spanLength: 55000 },
        { name: "A2", angle: 89.7708167291586, spanLength: 55000 },
        { name: "종점", angle: 90, spanLength: 800 }
      ],
      getGirderList: [
        { baseAlign: "align1", alignOffset: -100.0, isBeam: false },
        { baseAlign: "align1", alignOffset: 5010.0, isBeam: false },
        // { baseAlign: "align1", alignOffset: 10010.0, isBeam: false }
      ]
    },
    SEShape: {
      start: {
        A: 150,
        B: 300,
        C: 150,
        D: 50,
        E: 500,
        F: 2000,
        G: 1000,
        // J: 470,
        // S: 270,
        Taper: "parallel"
      },
      end: {
        A: 250,
        B: 300,
        C: 250,
        D: 50,
        E: 500,
        F: 2000,
        G: 1000,
        // J: 470,
        // S: 270,
        Taper: "parallel"
      },
      etc:{a:1}
    },

    girderBaseInfo: [
      { girderIndex: 0, 
        section: {B: 1700, UL: 1050, UR: 1050, C: 200, D: 200, C1: 100, D1: 100, H: 2000 },
        height: [
          //straight/circle/parabola
          { start: "G1K1", end: "G1H1", startH: 2000, endH: 2000, type: "straight" },
          { start: "G1H1", end: "G1H2", startH: 2000, endH: 2500, type: "circle" },
          { start: "G1H2", end: "G1H3", startH: 2500, endH: 2500, type: "straight" },
          { start: "G1H3", end: "G1H4", startH: 2500, endH: 2000, type: "circle" },
          { start: "G1H4", end: "G1K6", startH: 2000, endH: 2000, type: "straight" }
        ],
        slabThickness: [
          //straight/
          { start: "G1K1", end: "G1K2", startH: 470, endH: 470, type: "straight" },
          { start: "G1K2", end: "G1K3", startH: 470, endH: 270, type: "straight" },
          { start: "G1K4", end: "G1K5", startH: 270, endH: 470, type: "straight" },
          { start: "G1K5", end: "G1K6", startH: 270, endH: 470, type: "straight" },

        ],
        uFlange: [
          { start: "G1K1", end: "G1TF1", thickness: 18, startW: 400, endW: 400 },
          { start: "G1TF1", end: "G1T1", thickness: 18, startW: 400, endW: 400 },
          { start: "G1T1", end: "G1T2", thickness: 18, startW: 400, endW: 950 },
          { start: "G1T2", end: "G1T3", thickness: 18, startW: 1300, endW: 1300 },
          { start: "G1T3", end: "G1T4", thickness: 18, startW: 950, endW: 400 },
          { start: "G1T4", end: "G1K6", thickness: 18, startW: 400, endW: 400 },
        ],
        lFlange: [
          { start: "G1K1", end: "G1K6", thickness: 20 }],
        web: [
          { start: "G1K1", end: "G1K6", thickness: 14 }],
        uRib: [
          { start: "G1K1", end: "G1K6", thickness: 14, height: 150, layout: [-125, 125] }
        ],
        lRib: [
          { start: "G1K1", end: "G1K6", thickness: 14, height: 150, layout: [-125, 125] }
        ]
      },
      {
        girderIndex: 1,
        section: {
          B: 1700,
          UL: 1050,
          UR: 1050,
          C: 200,
          D: 200,
          C1: 100,
          D1: 100,
          H: 2000
        },
        height: [
          //straight/circle/parabola
          { start: "G2K1", end: "G2H1", startH: 2000, endH: 2000, type: "straight" },
          { start: "G2H1", end: "G2H2", startH: 2000, endH: 2500, type: "circle" },
          { start: "G2H2", end: "G2H3", startH: 2500, endH: 2500, type: "straight" },
          { start: "G2H3", end: "G2H4", startH: 2500, endH: 2000, type: "circle" },
          { start: "G2H4", end: "G2K6", startH: 2000, endH: 2000, type: "straight" }
        ],
        slabThickness: [
          //straight/
          { start: "G2K1", end: "G2K2", startH: 470, endH: 470, type: "straight" },
          { start: "G2K2", end: "G2K3", startH: 470, endH: 270, type: "straight" },
          { start: "G2K4", end: "G2K5", startH: 270, endH: 470, type: "straight" },
          { start: "G2K5", end: "G2K6", startH: 470, endH: 470, type: "straight" },

        ],
        uFlange: [
                 { start: "G2K1", end: "G2K6", thickness: 18, startW: 400, endW: 400 }
        ],
        lFlange: [
          { start: "G2K1", end: "G2K6", thickness: 20 }
        ],
        web: [
          { start: "G2K1", end: "G2K6", thickness: 14 }
        ],
        uRib: [
          {start: "G2K1", end: "G2K6", thickness: 14, height: 150, layout: [-125, 125]}
        ],
        lRib: [
          {start: "G2K1", end: "G2K6", thickness: 14, height: 150, layout: [-125, 125]}
        ]
      },
    ],

    xbeamLayout: [
      { iNode: "G1D5", jNode: "G2D5", section: "xbeamK" },
      { iNode: "G1D3", jNode: "G2D3", section: "xbeamK" },
      { iNode: "G1D1", jNode: "G2D1", section: "xbeamK" },
      { iNode: "G1D7", jNode: "G2D7", section: "xbeamK" },
      { iNode: "G1D9", jNode: "G2D9", section: "xbeamK" },
      { iNode: "G1D12", jNode: "G2D12", section: "xbeamK" },
      { iNode: "G1D14", jNode: "G2D14", section: "xbeamK" },
      { iNode: "G1D16", jNode: "G2D16", section: "xbeamK" },
      { iNode: "G1D18", jNode: "G2D18", section: "xbeamK" },
      { iNode: "G1D20", jNode: "G2D20", section: "xbeamK" },
      { iNode: "G1S1", jNode: "G2S1", section: "xbeamI" },
      { iNode: "G1S2", jNode: "G2S2", section: "xbeamI" },
      { iNode: "G1S3", jNode: "G2S3", section: "xbeamI" },
      // { iNode: "G1S4", jNode: "G2S4", section: "xbeamI" },
      // { iNode: "G1S5", jNode: "G2S5", section: "xbeamI" },
      // { iNode: "G1S6", jNode: "G2S6", section: "xbeamI" },
      // { iNode: "G1S7", jNode: "G2S7", section: "xbeamI" }
      // {iNode:"G1K1",jNode:"G2K1",section:"xbeam1"},
      // {iNode:"G1K2",jNode:"G2K2",section:"xbeam1"},
      // {iNode:"G1K3",jNode:"G2K3",section:"xbeam1"},
    ],

    xbeamSectionList: {
      xbeamI: {
        connectorWidth: 600,
        connectorLength: 500,
        upperFlangeThickness: 14,
        upperFlangeWidth: 300,
        webThickness: 10,
        lowerFlangeThickness: 14,
        lowerFlangeWidth: 300,
        vStiffThickness: 10,
        vStiffBottomOffset: 50,
        vStiffWidth: 150,
        vStiffendFillet: 140,
        scallopRadius: 35
      },
      xbeamK: {
        topOffset: 200,
        bottomOffset: 250,
        gussetThickness: 12,
        gussetBondingLength: 240,
        gussetWeldingOffset: 20,
        gussetTopWidth: 600,
        gussetBottomWidth: 400,
        gussetCenterWidth: 800,
        hFrameEndOffset: 70,
        diaFrameEndOffset: 220,
        //L150x150x12 section point, origin = (0,0)
        pts: [41.39, 29.39, -108.61, 150, 12]
      }
    },

    diaphragmLayout: [
      { position: "G1D1", section: "diaType1" },
      { position: "G1D2", section: "diaType1" },
      { position: "G1D3", section: "diaType1" },
      { position: "G1D4", section: "diaType1" },
      { position: "G1D5", section: "diaType1" },
      { position: "G1D6", section: "diaType1" },
      { position: "G1D7", section: "diaType1" },
      { position: "G1D8", section: "diaType1" },
      { position: "G1D9", section: "diaType1" },
      { position: "G1D10", section: "diaType1" },

      { position: "G2D1", section: "diaType1" },
      { position: "G2D2", section: "diaType1" },
      { position: "G2D3", section: "diaType1" },
      { position: "G2D4", section: "diaType1" },
      { position: "G2D5", section: "diaType1" },
      { position: "G2D6", section: "diaType1" },
      { position: "G2D7", section: "diaType1" },
      { position: "G2D8", section: "diaType1" },
      { position: "G2D9", section: "diaType1" },
      { position: "G2D10", section: "diaType1" },


      { position: "G1S1", section: "diaType2" },
      { position: "G1S2", section: "diaType2" },
      { position: "G1S3", section: "diaType2" },
      { position: "G2S1", section: "diaType2" },
      { position: "G2S2", section: "diaType2" },
      { position: "G2S3", section: "diaType2" },
    ],

    diaphragmSectionList: {
      diaType1: {
        lowerHeight: 250,
        lowerThickness: 12,
        lowerTopThickness: 10,
        lowerTopwidth: 100,
        upperThickness: 12,
        longiRibHeight: 150,
        longiRibRayout: [-125, 125],
        upperHeight: 220,
        sideHeight: 200,
        sideThickness: 14,
        leftsideTopwidth: 350,
        leftsideTopThickness: 12,
        leftsideToplength: 700,
        rightsideTopwidth: 220,
        rightsideTopThickness: 12,
        rightsideToplength: 80,
        upperTopThickness: 10,
        upperTopwidth: 150,
        // added variables
        scallopRadius: 35,
        ribHoleD: 42,
        ribHoleR: 25,
        //L100x100x10 section point, origin = (0,0)
        spc: 50,
        pts: [71.78, -18.22, -28.22, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
      },
      diaType2: {
        plateThickness: 12,
        holeBottomOffset: 450,
        holeRightOffset: -314,
        holeFilletR: 100,
        holeHeight: 700,
        holeWidth: 450,
        vStiffThickness: 20,
        vStiffWidth: 420,
        vStiffLayout: [-125, 125],
        topPlateWidth: 520,
        topPlateThickness: 10,
        hStiffThickness: 12,
        hStiffWidth: 150,
        hStiffBottomOffset: 700,

        holeVstiffnerThickness: 10,
        holeVstiffnerhight: 100,
        holeVstiffnerLength: 860,
        holeHstiffnerThickness: 10,
        holeHstiffnerHeight: 100,
        holeHstiffnerLength: 610,
        holeStiffSpacing: 20,
        holeVstiffnerLength: 860,
        // added variables
        scallopRadius: 35
      }
    },

    vStiffLayout: [
      { position: "G1V2", section: "vStiffType1" },
      { position: "G1V4", section: "vStiffType1" },
      { position: "G1V5", section: "vStiffType1" },
      { position: "G1V6", section: "vStiffType1" },
      { position: "G1V7", section: "vStiffType1" },
      { position: "G1V8", section: "vStiffType1" },
      { position: "G1V9", section: "vStiffType1" },
      { position: "G1V10", section: "vStiffType1" },
      { position: "G1V11", section: "vStiffType1" },
      { position: "G1V12", section: "vStiffType1" },
      { position: "G2V2", section: "vStiffType1" },
      { position: "G2V4", section: "vStiffType1" },
      { position: "G2V5", section: "vStiffType1" },
      { position: "G2V6", section: "vStiffType1" },
      { position: "G2V7", section: "vStiffType1" },
      { position: "G2V8", section: "vStiffType1" },
      { position: "G2V9", section: "vStiffType1" },
      { position: "G2V10", section: "vStiffType1" },
      { position: "G2V11", section: "vStiffType1" },
      { position: "G2V12", section: "vStiffType1" },

    ],

    vStiffSectionList: {
      vStiffType1: {
        sideHeight: 200,
        sideThickness: 14,
        upperHeight: 220,
        bottomOffset: 60,
        // added variables
        scallopRadius: 35,
        sideScallopOffset: 20,
        //L100x100x10 section point, origin = (0,0)
        spc: 50,
        pts: [100, 10, 0, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
      }
    },

    hBracingLayout: [
      { from: "G1S1", to: "G1V2", leftToright: true, section: "hBracingType1", platelayout: [false, false] },
      { from: "G1V2", to: "G1D1", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D1", to: "G1V4", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V4", to: "G1D2", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D2", to: "G1V5", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V5", to: "G1D3", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D3", to: "G1V6", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V6", to: "G1D4", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D4", to: "G1V7", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V7", to: "G1D5", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D5", to: "G1V8", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V8", to: "G1D6", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D6", to: "G1V9", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V9", to: "G1D7", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D7", to: "G1V10", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V10", to: "G1D8", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D8", to: "G1V11", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V11", to: "G1D9", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D9", to: "G1V12", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V12", to: "G1D10", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
    
      { from: "G2S1", to: "G2V2", leftToright: true, section: "hBracingType1", platelayout: [false, false] },
      { from: "G2V2", to: "G2D1", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D1", to: "G2V4", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V4", to: "G2D2", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D2", to: "G2V5", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V5", to: "G2D3", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D3", to: "G2V6", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V6", to: "G2D4", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D4", to: "G2V7", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V7", to: "G2D5", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D5", to: "G2V8", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V8", to: "G2D6", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D6", to: "G2V9", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V9", to: "G2D7", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D7", to: "G2V10", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V10", to: "G2D8", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D8", to: "G2V11", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V11", to: "G2D9", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D9", to: "G2V12", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V12", to: "G2D10", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
    ],




    hBracingSectionList: {
      hBracingType1: {
        upperHeight: 220,
        sideTopThickness: 14,
        sideToplength: 700,
        sideTopwidth: 300,
        // added variables
        scallopHeight: 200,
        scallopRadius: 25,
        scallopBottom: 42,
        //T150x150x6.5x9 section point, origin = (0,0)
        spc: 214,
        pts: [75, -75, -4.5, 4.5, -6.5, -150] //단면중심축에 대한 정보포함된 T형 단면정보 <-- L형하고 다름
      }
    },
  };
  const addedValues = {
    SlabInfo: [
      {
        Key: "start",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 470,
        T1: 440,
        T2: 440,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      },
      {
        Key: "center",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 270,
        T1: 240,
        T2: 240,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      },
      {
        Key: "end",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 470,
        T1: 440,
        T2: 440,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      }
    ],

    supportFixed: true, //고정단중심경우 true, 접선방향의 경우 false
    supportData: [
      { point: "G1S1", type: "종방향가동", offset: 0 },
      { point: "G1S2", type: "종방향가동", offset: 0 },
      { point: "G1S3", type: "종방향가동", offset: 0 },
      // { point: "G1S4", type: "고정단", offset: 0 },
      // { point: "G1S5", type: "종방향가동", offset: 0 },
      // { point: "G1S6", type: "종방향가동", offset: 0 },
      // { point: "G1S7", type: "종방향가동", offset: -507},
      // { point: "G2S1", type: "양방향단", offset: 0 },
      // { point: "G2S2", type: "양방향단", offset: 0 },
      // { point: "G2S3", type: "양방향단", offset: 0 },
      // { point: "G2S4", type: "횡방향가동", offset: 0 },
      // { point: "G2S5", type: "양방향단", offset: 0 },
      // { point: "G2S6", type: "양방향단", offset: 0 },
      // { point: "G2S7", type: "양방향단", offset: -507},
    ],
    diaPhragmLocate:[
      {name : "G1D1", BenchMark : "G1S1", offset: 4450},
      {name : "G1D2", BenchMark : "G1S1", offset: 9450},
      {name : "G1D3", BenchMark : "G1S1", offset: 14450},
      {name : "G1D4", BenchMark : "G1S1", offset: 19450},
      {name : "G1D5", BenchMark : "G1S1", offset: 24450},
      {name : "G1D6", BenchMark : "G1S1", offset: 29450},
      {name : "G1D7", BenchMark : "G1S1", offset: 34450},
      {name : "G1D8", BenchMark : "G1S1", offset: 39450},
      {name : "G1D9", BenchMark : "G1S1", offset: 44450},
      {name : "G1D10", BenchMark : "G1S1", offset: 49450},
      {name : "G1D11", BenchMark : "G1S2", offset: 5000},
      {name : "G1D12", BenchMark : "G1S2", offset: 10000},
      {name : "G1D13", BenchMark : "G1S2", offset: 15000},
      {name : "G1D14", BenchMark : "G1S2", offset: 20000},
      {name : "G1D15", BenchMark : "G1S2", offset: 25000},
      {name : "G1D16", BenchMark : "G1S2", offset: 30000},
      {name : "G1D17", BenchMark : "G1S2", offset: 35000},
      {name : "G1D18", BenchMark : "G1S2", offset: 40000},
      {name : "G1D19", BenchMark : "G1S2", offset: 45000},
      {name : "G1D20", BenchMark : "G1S2", offset: 50000},
      {name : "G2D1", BenchMark : "G1S1", offset: 4450},
      {name : "G2D2", BenchMark : "G1S1", offset: 9450},
      {name : "G2D3", BenchMark : "G1S1", offset: 14450},
      {name : "G2D4", BenchMark : "G1S1", offset: 19450},
      {name : "G2D5", BenchMark : "G1S1", offset: 24450},
      {name : "G2D6", BenchMark : "G1S1", offset: 29450},
      {name : "G2D7", BenchMark : "G1S1", offset: 34450},
      {name : "G2D8", BenchMark : "G1S1", offset: 39450},
      {name : "G2D9", BenchMark : "G1S1", offset: 44450},
      {name : "G2D10", BenchMark : "G1S1", offset: 49450},
      {name : "G2D11", BenchMark : "G1S2", offset: 5000},
      {name : "G2D12", BenchMark : "G1S2", offset: 10000},
      {name : "G2D13", BenchMark : "G1S2", offset: 15000},
      {name : "G2D14", BenchMark : "G1S2", offset: 20000},
      {name : "G2D15", BenchMark : "G1S2", offset: 25000},
      {name : "G2D16", BenchMark : "G1S2", offset: 30000},
      {name : "G2D17", BenchMark : "G1S2", offset: 35000},
      {name : "G2D18", BenchMark : "G1S2", offset: 40000},
      {name : "G2D19", BenchMark : "G1S2", offset: 45000},
      {name : "G2D20", BenchMark : "G1S2", offset: 50000},

    ],
    vStiffLocate:[
      {name : "G1V1", BenchMark : "G1S1", offset: 1113},
      {name : "G1V2", BenchMark : "G1S1", offset: 2225},
      {name : "G1V3", BenchMark : "G1S1", offset: 3337},
      {name : "G1V4", BenchMark : "G1S1", offset: 6950},
      {name : "G1V5", BenchMark : "G1S1", offset: 11950},
      {name : "G1V6", BenchMark : "G1S1", offset: 16950},
      {name : "G1V7", BenchMark : "G1S1", offset: 21950},
      {name : "G1V8", BenchMark : "G1S1", offset: 26950},
      {name : "G1V9", BenchMark : "G1S1", offset: 31950},
      {name : "G1V10", BenchMark : "G1S1", offset: 36950},
      {name : "G1V11", BenchMark : "G1S1", offset: 41950},
      {name : "G1V12", BenchMark : "G1S1", offset: 46950},    
      {name : "G1V13", BenchMark : "G1S1", offset: 51950},    
      {name : "G1V14", BenchMark : "G1S2", offset: 25000},    
      {name : "G1V15", BenchMark : "G1S2", offset: 75000},    
      {name : "G1V16", BenchMark : "G1S2", offset: 125000},    
      {name : "G1V17", BenchMark : "G1S2", offset: 175000},    
      {name : "G1V18", BenchMark : "G1S2", offset: 225000},    
      {name : "G1V19", BenchMark : "G1S2", offset: 275000},    
      {name : "G1V20", BenchMark : "G1S2", offset: 325000},    
      {name : "G1V21", BenchMark : "G1S2", offset: 375000},    
      {name : "G1V22", BenchMark : "G1S2", offset: 425000},    
      {name : "G1V23", BenchMark : "G1S2", offset: 475000},    
      {name : "G1V24", BenchMark : "G1S2", offset: 525000},    
     
      {name : "G2V1", BenchMark : "G1S1", offset: 1113},
      {name : "G2V2", BenchMark : "G1S1", offset: 2225},
      {name : "G2V3", BenchMark : "G1S1", offset: 3337},
      {name : "G2V4", BenchMark : "G1S1", offset: 6950},
      {name : "G2V5", BenchMark : "G1S1", offset: 11950},
      {name : "G2V6", BenchMark : "G1S1", offset: 16950},
      {name : "G2V7", BenchMark : "G1S1", offset: 21950},
      {name : "G2V8", BenchMark : "G1S1", offset: 26950},
      {name : "G2V9", BenchMark : "G1S1", offset: 31950},
      {name : "G2V10", BenchMark : "G1S1", offset: 36950},
      {name : "G2V11", BenchMark : "G1S1", offset: 41950},
      {name : "G2V12", BenchMark : "G1S1", offset: 46950},    
      {name : "G2V13", BenchMark : "G1S1", offset: 51950},    
      {name : "G2V14", BenchMark : "G1S2", offset: 25000},    
      {name : "G2V15", BenchMark : "G1S2", offset: 75000},    
      {name : "G2V16", BenchMark : "G1S2", offset: 125000},    
      {name : "G2V17", BenchMark : "G1S2", offset: 175000},    
      {name : "G2V18", BenchMark : "G1S2", offset: 225000},    
      {name : "G2V19", BenchMark : "G1S2", offset: 275000},    
      {name : "G2V20", BenchMark : "G1S2", offset: 325000},    
      {name : "G2V21", BenchMark : "G1S2", offset: 375000},    
      {name : "G2V22", BenchMark : "G1S2", offset: 425000},    
      {name : "G2V23", BenchMark : "G1S2", offset: 475000},    
      {name : "G2V24", BenchMark : "G1S2", offset: 525000},    


    ],
    splice:[
      {name : "G1SP1", BenchMark : "G1S1", offset: 8200},
      {name : "G1SP2", BenchMark : "G1S1", offset: 18200},
      {name : "G1SP3", BenchMark : "G1S1", offset: 28200},
      {name : "G1SP4", BenchMark : "G1S1", offset: 38200},
      {name : "G1SP5", BenchMark : "G1S1", offset: 50700},
      {name : "G1SP6", BenchMark : "G1S1", offset: 58200},
      {name : "G2SP1", BenchMark : "G1S1", offset: 8200},
      {name : "G2SP2", BenchMark : "G1S1", offset: 18200},
      {name : "G2SP3", BenchMark : "G1S1", offset: 28200},
      {name : "G2SP4", BenchMark : "G1S1", offset: 38200},
      {name : "G2SP5", BenchMark : "G1S1", offset: 50700},
      {name : "G2SP6", BenchMark : "G1S1", offset: 58200},
    ],
    joint:[
      {name : "G1TF1", BenchMark : "G1V11", offset: 1250},
      {name : "G1BF1", BenchMark : "G1D1", offset: 1250},
    ],
    height:[
      {name : "G1H1", BenchMark : "G1S2", offset: -19500},
      {name : "G1H2", BenchMark : "G1S2", offset: -2500},
      {name : "G1H3", BenchMark : "G1S2", offset: 2500},
      {name : "G1H4", BenchMark : "G1S2", offset: 19500},
      {name : "G2H1", BenchMark : "G2S2", offset: -19500},
      {name : "G2H2", BenchMark : "G2S2", offset: -2500},
      {name : "G2H3", BenchMark : "G2S2", offset: 2500},
      {name : "G2H4", BenchMark : "G2S2", offset: 19500},
    ],
    taperedPoint:[
      {name : "G1T1", BenchMark : "G1S2", offset: -11250},
      {name : "G1T2", BenchMark : "G1S2", offset: -6450},
      {name : "G1T3", BenchMark : "G1S2", offset: 6450},
      {name : "G1T4", BenchMark : "G1S2", offset: 11250},
    ]
  };

  const {
    horizon,
    vertical,
    superElevation,
    girderLayoutInput,
    SEShape,
    girderBaseInfo,
    xbeamLayout,
    xbeamSectionList,
    diaphragmLayout,
    diaphragmSectionList,
    vStiffLayout,
    vStiffSectionList,
    hBracingLayout,
    hBracingSectionList
  } = defaultValues;

  const {
    SlabInfo,
    supportFixed,
    supportData,
    diaPhragmLocate,
    vStiffLocate,
    splice,
    joint,
    height,
    taperedPoint,  
  } = addedValues;

  function HorizonInput(){
    this.addOutput("horizon","horizon");
  }
  HorizonInput.prototype.onExecute = function() {
    this.setOutputData(0,horizon);
  };
  global.LiteGraph.registerNodeType("HMInput/Horizon", HorizonInput);

  function VerticalInput(){
    this.addOutput("vertical","vertical");
  }
  VerticalInput.prototype.onExecute = function() {
    this.setOutputData(0,vertical);
  };
  global.LiteGraph.registerNodeType("HMInput/vertical", VerticalInput);

  function SuperElevationInput(){
    this.addOutput("superElevation","superElevation");
  }
  SuperElevationInput.prototype.onExecute = function() {
    this.setOutputData(0,superElevation);
  };
  global.LiteGraph.registerNodeType("HMInput/superElevation", SuperElevationInput);


  function GirderLayoutInput(){
    this.addOutput("girderLayoutInput","girderLayoutInput");
  }
  GirderLayoutInput.prototype.onExecute = function() {
    this.setOutputData(0,girderLayoutInput);
  };
  global.LiteGraph.registerNodeType("HMInput/girderLayoutInput", GirderLayoutInput);

  function SEShapeInput(){
    this.addOutput("SEShape","SEShape");
  }
  SEShapeInput.prototype.onExecute = function() {
    this.setOutputData(0,SEShape);
  };
  global.LiteGraph.registerNodeType("HMInput/SEShape", SEShapeInput);

  function GirderBaseInfo(){
    this.addOutput("girderBaseInfo","girderBaseInfo");
  }
  GirderBaseInfo.prototype.onExecute = function() {
    this.setOutputData(0,girderBaseInfo);
  };
  global.LiteGraph.registerNodeType("HMInput/girderBaseInfo", GirderBaseInfo);


  function DiaphragmInput(){
    this.addOutput("diaphragmLayout","diaphragmLayout");
    this.addOutput("diaphragmSectionList","diaphragmSectionList");
  }
  DiaphragmInput.prototype.onExecute = function() {
    this.setOutputData(0,diaphragmLayout);
    this.setOutputData(1,diaphragmSectionList);
  };
  global.LiteGraph.registerNodeType("HMInput/diaphragmInput", DiaphragmInput);

  function VStiffInput(){
    this.addOutput("vStiffLayout","vStiffLayout");
    this.addOutput("vStiffSectionList","vStiffSectionList");
  }
  VStiffInput.prototype.onExecute = function() {
    this.setOutputData(0,vStiffLayout);
    this.setOutputData(1,vStiffSectionList);
  };
  global.LiteGraph.registerNodeType("HMInput/vStiffInput", VStiffInput);



  function GridPointInput(){
    this.addOutput("diaPhragmLocate","diaPhragmLocate");
    this.addOutput("vStiffLocate","vStiffLocate");
    this.addOutput("splice","splice");
    this.addOutput("joint","joint");
    this.addOutput("height","height");
    this.addOutput("taperedPoint","taperedPoint");
  }
  GridPointInput.prototype.onExecute = function() {
    this.setOutputData(0,diaPhragmLocate);
    this.setOutputData(1,vStiffLocate);
    this.setOutputData(2,splice);
    this.setOutputData(3,joint);
    this.setOutputData(4,height);
    this.setOutputData(5,taperedPoint);
  };
  global.LiteGraph.registerNodeType("HMInput/gridPointInput", GridPointInput);
  //git

  const MasterLineData = (horizon, VerticalDataList, superElevation, beginStation) => {
    let lineResult = LineGenerator2(horizon, beginStation);
    let parabolaData = [];
    let tangent = [];
    for (let i = 0; i < VerticalDataList.length - 1; i++) {
      tangent.push((VerticalDataList[i + 1][1] - VerticalDataList[i][1]) /
        (VerticalDataList[i + 1][0] - VerticalDataList[i][0]));
    }
    for (let i = 0; i < VerticalDataList.length - 2; i++) {
      let parabola1 = VerticalDataList[i + 1][0] - VerticalDataList[i + 1][2] / 2;
      let parabola2 = VerticalDataList[i + 1][0] + VerticalDataList[i + 1][2] / 2;
      parabolaData.push([
        parabola1,
        parabola2,
        VerticalDataList[i][1] + tangent[i] * (parabola1 - VerticalDataList[i][0]),
        VerticalDataList[i + 1][1] + tangent[i + 1] * (parabola2 - VerticalDataList[i + 1][0]),
        VerticalDataList[i + 1][2]
      ]);
    }
    lineResult.tangent = tangent;
    lineResult.parabolaData = parabolaData;
    lineResult.VerticalDataList = VerticalDataList;
    lineResult.SuperElevation = superElevation;
    lineResult.points = [];
    const spacing = 10000;
    for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
      lineResult.points.push(MasterPointGenerator(i, lineResult));
    }
    
    return lineResult
  };

  const LineGenerator2 = (horizonDataList,beginStation) => {
    // console.time("for loop");
    let lineResult = {
      vectors: [],
      curves: [],
      segments: { start: [], end: [] },
      beginStationNumber: 0,
      endStationNumber: 0,
      startPoint: [],
    };
    for (let i = 0; i < horizonDataList.length - 1; i++) {
      lineResult.startPoint.push(_.take(horizonDataList[i], 2));
      lineResult.vectors.push(
        Vector2d([
          _.take(horizonDataList[i], 2),
          _.take(horizonDataList[i + 1], 2)
        ])
      );
    }

    for (let i = 0; i < horizonDataList.length - 2; i++) {
      lineResult.curves.push(
        Curve(
          _.take(horizonDataList[i], 2),
          lineResult.vectors[i],
          lineResult.vectors[i + 1],
          horizonDataList[i + 1][2],
          horizonDataList[i + 1][3],
          horizonDataList[i + 1][4],
        )
      );
    }
    let segmentsStation = beginStation;
    lineResult.segments.start.push(segmentsStation);
    for (let j = 0; j < (horizonDataList.length - 2); j++) {
      if (j === 0) {
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
        lineResult.segments.start.push(segmentsStation);
      } else {
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j - 1].endOffset;
        lineResult.segments.start.push(segmentsStation);
      }
      segmentsStation += lineResult.curves[j].beginClothoid.length;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation += lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation += lineResult.curves[j].endClothoid.length;
      lineResult.segments.start.push(segmentsStation);
    }
    lineResult.segments.end.push(..._.drop(lineResult.segments.start));
    if (lineResult.curves.length === 0) {
      segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length;
    } else {
      segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length - lineResult.curves[lineResult.curves.length - 1].endOffset;
    }
    lineResult.segments.end.push(segmentsStation);
    lineResult.beginStationNumber = lineResult.segments.start[0];
    lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];
    return lineResult;
  };

  const MasterPointGenerator = (station, Masterline,skew) => {
    let resultPoint = {
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: station.toFixed(4) * 1,
      virtual: false,
      gradientX:0,
      leftGradient:0,
      rightGradient:0,
      skew: skew? skew: 90,
    };
    // const dataList = Masterline.input.horizonDataList;
    const startStationNumList = Masterline.segments.start;
    const endStationNumList = Masterline.segments.end;
    
    let gradX =0;
    let leftG =0;
    let rightG = 0;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = Masterline.startPoint;
    let tempRes = [0, 0, 0, 0];

    for (let i = 0; i < startStationNumList.length;i++) { //= 4 * (dataList.length - 2); i++) {
      l = station - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        station >= startStationNumList[i] &&
        station <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
              tempRes[0] = startPoint[lineNum][0] + l * Masterline.vectors[lineNum].cos;
              tempRes[1] = startPoint[lineNum][1] + l * Masterline.vectors[lineNum].sin;
            } else {
              tempRes[0] = Masterline.curves[lineNum - 1].endClothoidCoord[0] + l * Masterline.vectors[lineNum].cos;
              tempRes[1] = Masterline.curves[lineNum - 1].endClothoidCoord[1] + l * Masterline.vectors[lineNum].sin;
            }
            tempRes[2] = Masterline.vectors[lineNum].sin;
            tempRes[3] = -1 * Masterline.vectors[lineNum].cos;
            break;
          case 1:
            tempRes = Masterline.curves[lineNum].beginClothoidStation(l);
            break;
          case 2:
            tempRes = Masterline.curves[lineNum].arcStation(l);
            break;
          case 3:
            tempRes = Masterline.curves[lineNum].endClothoidStation(l);
            break;
        }
        resultPoint.x = tempRes[0];
        resultPoint.y = tempRes[1];
        resultPoint.normalCos = tempRes[2];
        resultPoint.normalSin = tempRes[3];
        break;
      }
    }
    if (station <= Masterline.VerticalDataList[0][0]) {
      resultPoint.z = Masterline.VerticalDataList[0][1] + Masterline.tangent[0] * (station - Masterline.VerticalDataList[0][0]);
      gradX = Masterline.tangent[0];
    } else if (station >= Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]) {
      resultPoint.z = Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][1] + Masterline.tangent[Masterline.tangent.length - 1] * (station - Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]);
      gradX = Masterline.tangent[Masterline.tangent.length - 1];
    } else {
      for (let i = 0; i < Masterline.VerticalDataList.length - 1; i++) {
        if (station >= Masterline.VerticalDataList[i][0] && station < Masterline.VerticalDataList[i + 1][0]) {
          resultPoint.z = Masterline.VerticalDataList[i][1] + Masterline.tangent[i] * (station - Masterline.VerticalDataList[i][0]);
          gradX = Masterline.tangent[i];
        }
      }
      for (let i = 0; i < Masterline.VerticalDataList.length - 2; i++) {
        if (station >= Masterline.parabolaData[i][0] && station <= Masterline.parabolaData[i][1]) {
          resultPoint.z = Masterline.parabolaData[i][2] +
          Masterline.tangent[i] * (station - Masterline.parabolaData[i][0]) +
            (Masterline.tangent[i + 1] - Masterline.tangent[i]) / 2 / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0]) ** 2;
          gradX = Masterline.tangent[i] + (Masterline.tangent[i + 1] - Masterline.tangent[i]) / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0]);
        }
      }
    }
    if (station <= Masterline.SuperElevation[0][0]) {
        leftG = -Masterline.SuperElevation[0][1];
        rightG = Masterline.SuperElevation[0][2];
    } else if (station >= Masterline.SuperElevation[Masterline.SuperElevation.length - 1][0]) {
        leftG = -Masterline.SuperElevation[Masterline.SuperElevation.length - 1][1];
        rightG = Masterline.SuperElevation[Masterline.SuperElevation.length - 1][2];
    } else {
      for (let i = 0; i < Masterline.SuperElevation.length - 1; i++) {
        if (station >= Masterline.SuperElevation[i][0] && station < Masterline.SuperElevation[i + 1][0]) {
            leftG = -((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
              * (Masterline.SuperElevation[i + 1][1] - Masterline.SuperElevation[i][1]) + Masterline.SuperElevation[i][1]);
            rightG = ((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
              * (Masterline.SuperElevation[i + 1][2] - Masterline.SuperElevation[i][2]) + Masterline.SuperElevation[i][2]);
        }
      }
    }

    resultPoint.gradientX = gradX;
    resultPoint.leftGradient = leftG/100;
    resultPoint.rightGradient = rightG/100;
    return resultPoint;
  };

  function Vector2d(xydata) {
    let vectorX = xydata[1][0] - xydata[0][0];
    let vectorY = xydata[1][1] - xydata[0][1];
    let vector = [vectorX, vectorY];
    let length = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
    let cos = vectorX / length;
    let sin = vectorY / length;
    return { vector, length, cos, sin }
  }


  function Curve(startPoint, vector1, vector2, radius, a1, a2) {
    if (radius !== 0) {
        // let vector1 = Vector2d(xydata1);
        // let vector2 = Vector2d(xydata2);
        let angle = Math.acos((vector1.vector[0] * vector2.vector[0] + vector1.vector[1] * vector2.vector[1]) / (vector1.length * vector2.length));
        let arcRadius = radius;
        let aBegin = a1;
        let aEnd = a2;

        let sign = 0;

        if ((-1 * vector2.cos * vector1.sin + vector2.sin * vector1.cos) > 0) {
            sign = 1;    // Counter clockwise
        }
        else {
            sign = -1;   // Clockwise
        }

        let beginClothoid = Clothoid(radius, a1);
        let endClothoid = Clothoid(radius, a2);
        let arcAngle = angle - beginClothoid.angle - endClothoid.angle;

        let beginOffset = beginClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
            endClothoid.offset / Math.sin(angle) - beginClothoid.offset / Math.tan(angle);

        let endOffset = endClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
            beginClothoid.offset / Math.sin(angle) - endClothoid.offset / Math.tan(angle);

        let beginClothoidCoord = [startPoint[0] + (vector1.length - beginOffset) * vector1.cos,
        startPoint[1] + (vector1.length - beginOffset) * vector1.sin];

        let beginArcCoord = [beginClothoidCoord[0] + beginClothoid.totalX * vector1.cos - sign * beginClothoid.totalY * vector1.sin,
        beginClothoidCoord[1] + beginClothoid.totalX * vector1.sin + sign * beginClothoid.totalY * vector1.cos];

        let arcCenter = [beginClothoidCoord[0] + beginClothoid.radiusCenterOffset * vector1.cos - sign * (radius + beginClothoid.offset) * vector1.sin,
        beginClothoidCoord[1] + beginClothoid.radiusCenterOffset * vector1.sin + sign * (radius + beginClothoid.offset) * vector1.cos];

        let endArcCoord = [arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(arcAngle) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(arcAngle),
        arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(arcAngle) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(arcAngle)];

        let endClothoidCoord = [endArcCoord[0] + endClothoid.totalX * vector2.cos + sign * endClothoid.totalY * vector2.sin,
        endArcCoord[1] + endClothoid.totalX * vector2.sin - sign * endClothoid.totalY * vector2.cos];

        function beginClothoidStation(l) {
            let clothoidX = l * (1 - l ** 4 / 40 / aBegin ** 4 + l ** 8 / 3456 / aBegin ** 8);
            let clothoidY = l ** 3 / 6 / aBegin ** 2 * (1 - l ** 4 / 56 / aBegin ** 4 + l ** 8 / 7040 / aBegin ** 8);
            let resultX = beginClothoidCoord[0] + vector1.cos * clothoidX - sign * vector1.sin * clothoidY;
            let resultY = beginClothoidCoord[1] + vector1.sin * clothoidX + sign * vector1.cos * clothoidY;
            let slopeDeltaX = (1 - l ** 4 * 5 / 40 / aBegin ** 4 + l ** 8 * 9 / 3456 / aBegin ** 8);
            let slopeDeltaY = l ** 2 / 6 / aBegin ** 2 * (3 - l ** 4 * 7 / 56 / aBegin ** 4 + l ** 8 * 11 / 7040 / aBegin ** 8);
            let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
            let normalCos = sign * slopeDeltaY / slopeLength;
            let normalSin = -1 * slopeDeltaX / slopeLength;
            let globalNormalCos = vector1.cos * normalCos - vector1.sin * normalSin;
            let globalNormalSin = vector1.sin * normalCos + vector1.cos * normalSin;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        function endClothoidStation(l) {
            l = endClothoid.length - l;
            let clothoidX = endClothoid.totalX - (l * (1 - l ** 4 / 40 / aEnd ** 4 + l ** 8 / 3456 / aEnd ** 8));
            let clothoidY = -1 * endClothoid.totalY + (l ** 3 / 6 / aEnd ** 2 * (1 - l ** 4 / 56 / aEnd ** 4 + l ** 8 / 7040 / aEnd ** 8));
            let resultX = endArcCoord[0] + vector2.cos * clothoidX - sign * vector2.sin * clothoidY;
            let resultY = endArcCoord[1] + vector2.sin * clothoidX + sign * vector2.cos * clothoidY;
            let slopeDeltaX = -1 * (1 - l ** 4 * 5 / 40 / aEnd ** 4 + l ** 8 * 9 / 3456 / aEnd ** 8);
            let slopeDeltaY = l ** 2 / 6 / aEnd ** 2 * (3 - l ** 4 * 7 / 56 / aEnd ** 4 + l ** 8 * 11 / 7040 / aEnd ** 8);
            let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
            let normalCos = -sign * slopeDeltaY / slopeLength;
            let normalSin = slopeDeltaX / slopeLength;
            let globalNormalCos = vector2.cos * normalCos - vector2.sin * normalSin;
            let globalNormalSin = vector2.sin * normalCos + vector2.cos * normalSin;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        function arcStation(l) {
            let resultX = arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(l / arcRadius) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(l / arcRadius);
            let resultY = arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(l / arcRadius) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(l / arcRadius);
            let globalNormalCos = sign * (resultX - arcCenter[0]) / arcRadius;
            let globalNormalSin = sign * (resultY - arcCenter[1]) / arcRadius;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        let result = {
            angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
            arcCenter, endArcCoord, endClothoidCoord, beginClothoidStation, endClothoidStation, arcStation, sign
        };
        return result
    }
    else {
        let angle = 0;
        let beginClothoid = Clothoid(radius, a1);
        let endClothoid = Clothoid(radius, a2);
        let arcRadius = 0;
        let arcAngle = 0;
        let beginOffset = 0;
        let endOffset = 0;
        let beginClothoidCoord = 0;
        let beginArcCoord = 0;
        let arcCenter = 0;
        let endArcCoord = 0;
        let endClothoidCoord = 0;

        let result = {
            angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
            arcCenter, endArcCoord, endClothoidCoord
        };
        return result
    }

  }


  function Clothoid(radius, a) {
    if (radius !== 0) {
        let length = Math.pow(a, 2) / radius;
        let angle = Math.pow(a, 2) / Math.pow(radius, 2) / 2;
        let totalX = length * (1 - Math.pow(length, 2) / 40 / Math.pow(radius, 2) + Math.pow(length, 4) / 3456 / Math.pow(radius, 4));
        let totalY = Math.pow(length, 2) / 6 / radius * (1 - Math.pow(length, 2) / 56 / Math.pow(radius, 2) + Math.pow(length, 4) / 7040 / Math.pow(radius, 4));
        let offset = totalY - radius * (1 - Math.cos(angle));
        let radiusCenterOffset = totalX - radius * Math.sin(angle);

        let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
        return result
    }
    else {
        let length = 0;
        let angle = 0;
        let totalX = 0;
        let totalY = 0;
        let offset = 0;
        let radiusCenterOffset = 0;
        let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
        return result
    }
  }

  const OffsetLine = (offset, line) => {
   
    let points = [];
     for (let i = 0; i < line.points.length; i++) {
      let resultPoint = {
        stationNumber: line.points[i].stationNumber,
        x: line.points[i].x + line.points[i].normalCos * offset,
        y: line.points[i].y + line.points[i].normalSin * offset,
        z: 0,
        normalCos: line.points[i].normalCos,
        normalSin: line.points[i].normalSin,
        masterStationNumber: line.points[i].stationNumber,
        skew: line.points[i].skew,
        offset: offset,
        virtual: false
      };
       points.push(resultPoint);
    }
    return points
  };

  const PointLineMatch2 = (targetPoint, masterLine) => {
    let resultPoint = {};
    let point1 = {};
    let point2 = {};
    let crossproduct1 = 0;
    let crossproduct2 = 0;
    let innerproduct = 1;
    let station1 = 0;
    let station2 = 0;
    let station3 = 0;
    const err = 0.1;
    let num_iter = 0;
    let a = true;

    //matser_segment = variables.Segment_station_number(master_line_datalist)

    for (let i = 0; i < masterLine.segments.start.length; i++) {
      station1 = masterLine.segments.start[i];
      station2 = masterLine.segments.end[i];
      point1 = PointGenerator(station1, masterLine, 90);
      point2 = PointGenerator(station2, masterLine, 90);
      crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
      crossproduct2 = (targetPoint.x - point2.x) * point2.normalSin - (targetPoint.y - point2.y) * point2.normalCos;

      if (crossproduct1 * crossproduct2 < 0) {
        a = false;
        break;
      } else if (Math.abs(crossproduct1) < err) {
        resultPoint = { ...point1 };
        break;
      } else if (Math.abs(crossproduct2) < err) {
        resultPoint = { ...point2 };
        break;
      }
    }
    if (a == false) {
      while (Math.abs(innerproduct) > err) {
        innerproduct = (targetPoint.x - point1.x) * (-point1.normalSin) + (targetPoint.y - point1.y) * (point1.normalCos);
        station3 = station1 + innerproduct;
        point1 = PointGenerator(station3, masterLine, 90);
        station1 = point1.stationNumber;
        crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
        resultPoint = { ...point1 };
        num_iter += 1;
        if (num_iter == 200) {
          break;
        }
      }
    }  const MasterPoint = MasterPointGenerator(resultPoint.stationNumber,masterLine);
    //targetPoint.master_station_number = result.station_number
    return MasterPoint
  };

  const PointGenerator = (stationNumber, line, skew) => {
    let resultPoint = {
      stationNumber: stationNumber.toFixed(4) * 1,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: stationNumber,
      offset: 0,
      virtual: false,
      skew: skew,
    };
    // const dataList = line.input.horizonDataList;
    const startStationNumList = line.segments.start;
    const endStationNumList = line.segments.end;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = line.startPoint;
    let tempRes = [0, 0, 0, 0];

    for (let i = 0; i < startStationNumList.length;i++){  // }= 4 * (dataList.length - 2); i++) {
      l = stationNumber - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        stationNumber >= startStationNumList[i] &&
        stationNumber <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
              tempRes[0] = startPoint[lineNum][0] + l * line.vectors[lineNum].cos;
              tempRes[1] = startPoint[lineNum][1] + l * line.vectors[lineNum].sin;
            } else {
              tempRes[0] = line.curves[lineNum - 1].endClothoidCoord[0] + l * line.vectors[lineNum].cos;
              tempRes[1] = line.curves[lineNum - 1].endClothoidCoord[1] + l * line.vectors[lineNum].sin;
            }
            tempRes[2] = line.vectors[lineNum].sin;
            tempRes[3] = -1 * line.vectors[lineNum].cos;
            break;
          case 1:
            tempRes = line.curves[lineNum].beginClothoidStation(l);
            break;
          case 2:
            tempRes = line.curves[lineNum].arcStation(l);
            break;
          case 3:
            tempRes = line.curves[lineNum].endClothoidStation(l);
            break;
        }
        resultPoint.x = tempRes[0];
        resultPoint.y = tempRes[1];
        resultPoint.normalCos = tempRes[2];
        resultPoint.normalSin = tempRes[3];
        break;
      }
    }
    return resultPoint;
  };

  // import { LiteGraph, THREE, sceneAdder } from "global";

  function MasterLine(){
    this.addInput("horizon","arr");
    this.addInput("vertical","arr");
    this.addInput("superElevation","arr");
    this.addInput("beginStation","number");
    // this.addInput("slaveOrMaster","boolean");
    this.addOutput("points","points");
    this.addOutput("line","line");
  }
  MasterLine.prototype.onExecute = function() {

    const horizonDataList = this.getInputData(0);
    const verticalDataList = this.getInputData(1);
    const superElevation = this.getInputData(2);
    const beginStation = this.getInputData(3); //769452.42;
    let line = MasterLineData(horizonDataList,verticalDataList,superElevation,beginStation);
    this.points= line.points;
    this.setOutputData(0,line.points);
    this.setOutputData(1,line);
  };

  // MasterLine.prototype.on3DExecute = function() {
  //   let initPoint = { x: 178341809.1588868,
  //                     y: 552237726.8852764,
  //                     z: 26934.34284538262}
  //   let mesh = LineToThree(this.points,initPoint)
  //   sceneAdder({id:0,mesh:mesh});
  // };

  function GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput) {
      const angle = 0;
      const spanLength = 1;
      const baseLine = 0;
      const alignOffset = 1;

      let result = {
          masterLine: masterLine,
          startPoint: {},
          endPoint: {},
          girderLine: [],
          gridKeyPoint: {}
      };
      let supportStation = girderLayoutInput.baseValue;
      let bridgeLength = 0;
      let i = 0;
      girderLayoutInput.supportData.forEach(function (elem) {
          bridgeLength += elem[spanLength] ? elem[spanLength] : 0;
          let gridName = "CRS" + i;
          result.gridKeyPoint[gridName] = MasterPointGenerator(supportStation + bridgeLength, masterLine, elem[angle]);
          if (i === 0) {
              result.startPoint = result.gridKeyPoint[gridName];
          } else if (i === girderLayoutInput.supportData.length - 1) {
              result.endPoint = result.gridKeyPoint[gridName];
          }
          i++;
      });
      for (let j = 0; j < girderLayoutInput.getGirderList.length; j++) {
          let girderBaseLine = girderLayoutInput.getGirderList[j][baseLine] === "MasterLine" ? masterLine : slaveLine[girderLayoutInput.getGirderList[j][baseLine]];
          result.girderLine.push(OffsetLine(girderLayoutInput.getGirderList[j][alignOffset], girderBaseLine));
          // 추후에 거더라인이 포인트만 가져간다고 하면, 포인트에대한 내용만 보내줄것!
      }

      return result
  }


  function GridPointGenerator3(girderLayout, SEShape, gridInput) {
      let masterLine = girderLayout.masterLine;
      let nameToPointDict = {};
      const girderNumber = girderLayout.girderLine.length;
      let pointName = "";
      let offset = 0;
      for (let k = 0; k < 8; k++) {
          switch (k) {
              case 0: offset = SEShape.start.A; break;
              case 1: offset = SEShape.start.A + SEShape.start.D; break;
              case 2: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; break;
              case 3: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F + SEShape.start.G; break;
              case 4: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F + SEShape.end.G); break;
              case 5: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F); break;
              case 6: offset = -(SEShape.end.A + SEShape.end.D); break;
              case 7: offset = -(SEShape.end.A); break;
          }
          let masterPoint = k < 4 ? girderLayout.startPoint : girderLayout.endPoint;
          let skew = k < 4 ? OffsetSkewCalculator(masterPoint, girderLayout.startPoint.skew, offset, masterLine) : OffsetSkewCalculator(masterPoint, girderLayout.startPoint.skew, offset, masterLine);
          let centerPoint = MasterPointGenerator(masterPoint.masterStationNumber + offset, masterLine, skew);
          for (let i = 0; i < girderNumber; i++) {
              pointName = "G" + (i + 1) + "K" + k;
              nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i]);
          }
          nameToPointDict["CRK" + k] = centerPoint;
      }
      for (let k in girderLayout.gridKeyPoint) {
          let centerPoint = girderLayout.gridKeyPoint[k];
          for (let i = 0; i < girderNumber; i++) {
              pointName = "G" + (i + 1) + k.substr(2);
              nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i]);
          }
          nameToPointDict[k] = centerPoint;
      }
      // for (let i=0;i<girderNumber;i++){
      const name = 0;
      const BenchMark = 1;
      const off =2;
      for (let gp in gridInput)
          gridInput[gp].forEach(function (elem) {
              pointName = elem[name];
              let i = pointName.substr(1, 1) * 1 - 1;
              let masterstation = nameToPointDict[elem[BenchMark]].masterStationNumber + elem[off];

              let masterPoint = MasterPointGenerator(masterstation, masterLine);
              nameToPointDict[pointName] = LineMatch2(masterPoint, masterLine, girderLayout.girderLine[i]);
              //SplinePointGenerator(masterPoint, girderLayout.girderLine[i].points, masterLine.VerticalDataList, masterLine.SuperElevation);
          });
      // }
      let i = 0;
      girderLayout.masterLine.points.forEach(function (point) {
          if (point.masterStationNumber > nameToPointDict["CRK0"].masterStationNumber
              && point.masterStationNumber < nameToPointDict["CRK7"].masterStationNumber) {
              nameToPointDict["CRN" + i] = point;
              i++;
          }
      });

      return nameToPointDict
  }

  function OffsetSkewCalculator(masterPoint, masterSkew, offset, masterLine) {
      const startSkew = masterSkew;
      let offsetStation = masterPoint.masterStationNumber + offset;
      const offsetPoint = PointGenerator(offsetStation, masterLine);
      let sign = 1;
      if (masterPoint.normalCos * offsetPoint.normalSin - masterPoint.normalSin * offsetPoint.normalCos >= 0) {
          sign = 1;
      } else {
          sign = -1;
      }
      let deltaSkew = (Math.acos(masterPoint.normalCos * offsetPoint.normalCos + masterPoint.normalSin * offsetPoint.normalSin) * 180 / Math.PI).toFixed(4) * 1;
      let offsetSkew = startSkew - sign * (deltaSkew);
      if (offsetSkew > 90) { offsetSkew -= 180; }
      else if (offsetSkew < -90) { offsetSkew += 180; }
      return offsetSkew
  }

  const LineMatch2 = (masterPoint, masterLine, slavePoints) => {
    let resultPoint = {
      stationNumber: 0,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: 0,
      offset: 0,
      virtual: false,
      skew: masterPoint.skew,
      gradientX: 0,
      gradientY: 0,
    };
    const unitVx = -1 * masterPoint.normalSin;
    const unitVy = masterPoint.normalCos;
    const skewRadian = resultPoint.skew * Math.PI / 180;
    let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
    let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
    let alpha = dY;
    let beta = -1 * dX;
    let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
    let dummy1 = 0;
    let dummy2 = 0;
    let sign = 1;
    for (let i = 0; i < slavePoints.length - 1; i++) {
      dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
      dummy2 = alpha * slavePoints[i + 1].x + beta * slavePoints[i + 1].y + gamma;
      if (dummy1 === 0) {
        resultPoint = slavePoints[i];
        break;
      }
      else if (dummy2 === 0) {
        resultPoint = slavePoints[i + 1];
        break;
      }
      else if (dummy1 * dummy2 < 0) {
        let coe = splineCoefficient(slavePoints[i], slavePoints[i + 1]);
        let a = alpha * coe.a2 + beta * coe.a1;
        let b = alpha * coe.b2 + beta * coe.b1;
        let c = alpha * coe.c2 + beta * coe.c1 + gamma;
        let t = 0;
        let err = 0.001;
        if (a == 0) {
          t = -c / b;
        } else {
          t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          if (t > 1+err || t < -1 -err) {
            t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          }      }

        let deltaX = 2 * coe.a2 * (t) + coe.b2;
        let deltaY = 2 * coe.a1 * (t) + coe.b1;
        let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        resultPoint.normalCos = deltaY / len;
        resultPoint.normalSin = -deltaX / len;
        resultPoint.x = coe.a2 * (t ** 2) + coe.b2 * t + coe.c2;
        resultPoint.y = coe.a1 * (t ** 2) + coe.b1 * t + coe.c1;
        //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
        //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
        //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
        // check = {a:a,b:b,c:c,t:t,tt:tt,coe:coe} ;
        break;
      }
    }

      let newMasterPoint = masterPoint.skew === 90? masterPoint:PointLineMatch2(resultPoint, masterLine);

      resultPoint.masterStationNumber = newMasterPoint.masterStationNumber.toFixed(4) * 1;
      resultPoint.stationNumber = resultPoint.masterStationNumber;
      if (newMasterPoint.normalCos * (resultPoint.x - newMasterPoint.x) + newMasterPoint.normalSin * (resultPoint.y - newMasterPoint.y) >= 0) {
        sign = 1;
      }
      else {
        sign = -1;
      }
      resultPoint.offset = sign * Math.sqrt((resultPoint.x - newMasterPoint.x) ** 2 + (resultPoint.y - newMasterPoint.y) ** 2).toFixed(4) * 1;
      if (sign>0){
        resultPoint.z = newMasterPoint.z + newMasterPoint.rightGradient * resultPoint.offset;
      }else{
        resultPoint.z = newMasterPoint.z + newMasterPoint.leftGradient * resultPoint.offset;
      }
      resultPoint.gradientX = newMasterPoint.gradientX;
      resultPoint.gradientY = sign>0? newMasterPoint.rightGradient : newMasterPoint.leftGradient;
      // resultPoint.check = check
     
    return resultPoint
  };

  const splineCoefficient = (point1, point2) => {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    let b1 = (y2 - y1) / 2;
    let b2 = (x2 - x1) / 2;
    let a1 = 0.0;
    let a2 = 0.0;
    let df1 = 0.0;
    let df2 = 0.0;
    if (point1.normalSin === 0) {
      if (point2.normalSin === 0) ;
      else {
        df2 = -point2.normalCos / point2.normalSin;
        a2 = b2 / 2;
        a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
      }
    } else if (point2.normalSin === 0) {
      if (point2.normalSin === 0) ; else {
        df1 = -point1.normalCos / point1.normalSin;
        a2 = b2 / -2;
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    } else {
      df1 = -point1.normalCos / point1.normalSin;
      df2 = -point2.normalCos / point2.normalSin;

      if (df1 === df2) {
        a1 = 0;
        a2 = 0;
      } else {
        a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1));
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    }
    const c1 = y2 - a1 - b1;
    const c2 = x2 - a2 - b2;
    return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 }
  };

  function GridStationList(pointDict){
    let gs = [];
    let cs = [];
    for (let k in pointDict){
      let girderIndex = k.substr(1, 1) - 1;
      if (gs.length <= girderIndex){
        for (let i=0; i<=girderIndex - gs.length;i++){
          gs.push([]);
        }
      }

      if (k.substr(0, 1) === "G") {
          let s = pointDict[k].masterStationNumber;
          if (s>=pointDict["G"+(girderIndex+1)+"K1"].masterStationNumber&&
            s<=pointDict["G"+(girderIndex+1)+"K6"].masterStationNumber){
            gs[girderIndex].push({station:pointDict[k].masterStationNumber,key:k, point:pointDict[k]});
          }
        }else{
          cs.push({station:pointDict[k].masterStationNumber,key:k, point:pointDict[k]});
        }

    }
    gs.forEach(function(elem){elem.sort(function (a, b) { return a.station < b.station ? -1 : 1; });});
    cs.sort(function (a, b) { return a.station < b.station ? -1 : 1; });
    
    return   {girder:gs,centerLine:cs}
  }

  // import { LiteGraph, meshArr, THREE } from "global";
  // import {_} from "global";

  function GirderLayout(){
    this.addInput("MasterLine","line");
    this.addInput("SlaveLine","line");
    this.addInput("girderlayoutInput","girderlayoutInput");
    
    this.addOutput("girderLayout","girderLayout");
  }

  GirderLayout.prototype.onExecute = function() {
    const masterLine = this.getInputData(0);
    const slaveLine = [this.getInputData(1)];
    const girderLayoutInput = this.getInputData(2);
    const result = GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput);
    this.setOutputData(0, result);
  };

  // LiteGraph.registerNodeType("nexivil/Girder", Girder);


  function GridPoint(){
    this.addInput("girderLayout","girderLayout");
    this.addInput("SEShape","SEShape");
    this.addInput("GridInput","GridInput");
    this.addOutput("gridPoint","gridPoint");
  }

  GridPoint.prototype.onExecute = function() {
    const girderLayout = this.getInputData(0);
    const SEShape = this.getInputData(1);
    const gridInput = this.getInputData(2);
      
    const result = GridPointGenerator3(girderLayout, SEShape, gridInput);
    this.setOutputData(0, result);
  };

  // LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);

  function StationList(){
    this.addInput("gridPoint","gridPoint");
    this.addOutput("centerLineStation","centerLineStation");
    this.addOutput("girderStation","girderStation");
  }

  StationList.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
      
    const result = GridStationList(gridPoint);
    this.setOutputData(0, result.centerLine);
    this.setOutputData(1, result.girder);
  };

  function ToGlobalPoint(Point, node2D){
      let newPoint = {
          x:0, y:0, z:0
      };
      const cos = Point.normalCos;
      const sin = Point.normalSin;
      let skewCot = 0;
      if (Point.skew !=90){
          skewCot = - 1 / Math.tan(Point.skew * Math.PI/180); 
      }    let X = node2D.x;
      let Y = X * skewCot; 
      let Z = node2D.y;

      newPoint.x = Point.x + X * cos - Y*sin; 
      newPoint.y = Point.y + X * sin + Y*cos;
      newPoint.z = Point.z + Z;
      newPoint.s = Point.masterStationNumber;
      
      return newPoint
  }

  function WebPoint(point1, point2, tan1, H){
    let x;
    let y;
    if (point1.x === point2.x){
      x = point1.x;
      y = tan1 === null? null : tan1 * (x) + H;
    }else{
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      x = tan1 === null? point1.x:(b - H) / (tan1 - a);
      y = a * (x) + b; 
    }
    return {x,y}
  }

  function PlateRestPoint(point1, point2, tan1, tan2, thickness){
    let x3;
    let x4;
    let y3;
    let y4;
    if (point1.x === point2.x){
      x3 = point1.x + thickness; 
      x4 = point2.x + thickness;
      y3 = tan1 === null? null : tan1 * (x3 - point1.x) + point1.y;
      y4 = tan2 === null? null : tan2 * (x4 - point2.x) + point2.y;
    }else{
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      let alpha = thickness * Math.sqrt(1 + 1/a**2);
      x3 = tan1 === null? point1.x:(-a * alpha + b + tan1 * point1.x - point1.y) / (tan1 - a);
      x4 = tan2 === null? point2.x:(-a * alpha + b + tan2 * point2.x - point2.y) / (tan2 - a);
      y3 = a ===0? point1.y + thickness : a * (x3 - alpha) + b; 
      y4 = a ===0? point2.y + thickness : a * (x4 - alpha) + b;
    }
    return [point1,point2,{x:x4,y:y4},{x:x3,y:y3}]
  }

  function Kframe(node1, node2, ioffset, joffset, pts){
    let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
    let vec = Vector(node1, node2);
    let plate1 = [ XYOffset(node1,vec,ioffset,pts[0]),
                  XYOffset(node1,vec,ioffset,pts[1]),
                  XYOffset(node1,vec,(length-joffset),pts[1]),
                  XYOffset(node1,vec,(length-joffset),pts[0]), ];
    let plate2 = [ XYOffset(node1,vec,ioffset,pts[1]),
                  XYOffset(node1,vec,ioffset,pts[2]),
                  XYOffset(node1,vec,(length-joffset),pts[2]),
                  XYOffset(node1,vec,(length-joffset),pts[1]),];
    return [plate1, plate2]
  }

  function XYOffset(node, vector, xoffset, yoffset){
    return {
      x:node.x + vector.x *xoffset - vector.y* yoffset, 
      y: node.y + vector.y * xoffset + vector.x* yoffset}
    }
  function Vector(node1,node2){
    let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
    return {x :(node2.x-node1.x)/length, y:(node2.y-node1.y)/length }
  }

  function scallop(point1,point2,point3,radius,smoothness){
    let points = [];
    let v1 = new global.THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
    let v2 = new global.THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
    for (let i = 0; i < smoothness+1 ; i++){
      let v3 = new global.THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
      points.push({x: v3.x + point2.x, y: v3.y +point2.y});
    }
    return points
  }

  function Fillet2D(point1, point2, point3, radius, smoothness){
    let lv1 = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);  
    let lv2 = Math.sqrt((point3.x - point2.x)**2 + (point3.y - point2.y)**2);  
    let v1 = {x: (point1.x - point2.x)/lv1, y:(point1.y - point2.y)/lv1 };
    let v2 = {x: (point3.x - point2.x)/lv2, y:(point3.y - point2.y)/lv2 };
    let ang = Math.acos(v1.x*v2.x + v1.y*v2.y);
    let l1 = radius / Math.sin(ang / 2) / Math.sqrt((v1.x+v2.x)**2+(v1.y+v2.y)**2);
    let v3 = {x : (v1.x+v2.x) * l1, y : (v1.y+v2.y) * l1};
    let centerPoint = {x: point2.x + v3.x, y:point2.y + v3.y};
    let l2 = radius / Math.tan(ang / 2);
    let p1 = {x: point2.x + v1.x * l2, y:point2.y + v1.y*l2};
    let p2 = {x: point2.x + v2.x * l2, y:point2.y + v2.y*l2};
    let vc1 = {x: p1.x - centerPoint.x, y:p1.y - centerPoint.y};
    let vc2 = {x: p2.x- centerPoint.x, y:p2.y - centerPoint.y};
    let points = [];
    points.push(p1);
      for (let j = 0; j < smoothness; j++) {
        let dirVec = {x:vc1.x * (smoothness - j) + vc2.x * (j+1) , y: vc1.y * (smoothness - j) + vc2.y * (j+1)};
        let l3 = radius / Math.sqrt(dirVec.x**2+dirVec.y**2);
        points.push({x: centerPoint.x + dirVec.x * l3, y:centerPoint.y + dirVec.y * l3});
      }
    points.push(p2);
    return points
   }

  function PlateSize(points,index,thickness){
    let index2;
    index2 = index === points.length-1? 0 : index + 1;
    let a = Math.atan2(points[index2].y -points[index].y,points[index2].x -points[index].x );
    let xs = [];
    let ys = [];
    for (let i =0;i<points.length;i++){
      xs.push(points[i].x * Math.cos(-a) - points[i].y * Math.sin(-a));
      ys.push(points[i].x * Math.sin(-a) + points[i].y * Math.cos(-a));
    }
    let Length = Math.max(...xs) - Math.min(...xs);
    let Height = Math.max(...ys) - Math.min(...ys);
    return {L:Length,T:thickness,H:Height,Label:"PL-"+Height.toFixed(0) + 'x' + thickness.toFixed(0) + 'x' + Length.toFixed(0)}
  }

  function PlateSize2(points,index,thickness,width){
    let index2;
    index2 = index === points.length-1? 0 : index + 1;
    let a = Math.atan2(points[index2].y -points[index].y,points[index2].x -points[index].x );
    let xs = [];
    for (let i =0;i<points.length;i++){
      xs.push(points[i].x * Math.cos(-a) - points[i].y * Math.sin(-a));
    }
    let Length = Math.max(...xs) - Math.min(...xs);
    let Height = width;
    return {L:Length,T:thickness,H:Height,Label:"PL-"+Height.toFixed(0) + 'x' + thickness.toFixed(0) + 'x' + Length.toFixed(0)}
  }

  function PointLength(point1,point2){
    return Math.sqrt((point1.x-point2.x)**2 + (point1.y-point2.y)**2)
  }

  function SectionPointDict(pointDict, girderBaseInfo, slabInfo, slabLayout) {
    let result = {};
    for (let k in pointDict) {
      if (k.substr(0, 1) === "G") {
        let point = pointDict[k];
        let girderIndex = k.substr(1, 1) - 1;

        let station = point.masterStationNumber;
        let gradient = point.gradientY;
        let skew = point.skew;
        let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo[girderIndex], slabLayout, pointDict);
        let sectionInfo = girderBaseInfo[girderIndex].section;

        const height = pointSectionInfo.forward.height;
        const centerThickness = slabInfo.slabThickness; //  slab변수 추가
        const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H };
        const lwt = { x: - sectionInfo.UL, y: 0 };
        const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H };
        const rwt = { x: sectionInfo.UR, y: 0 };
        let forward = {};
        let backward = {};
        let ps = {};
        // let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            ps = pointSectionInfo.forward;
          } else {
            ps = pointSectionInfo.backward;
          }
          let slabThickness = ps.slabThickness - centerThickness;

          let Rib = {};
          for (let j in ps.lRibLO) {
            let lRib = [{ x: ps.lRibLO[j] - ps.lRibThk / 2, y: -height }, { x: ps.lRibLO[j] - ps.lRibThk / 2, y: -height + ps.lRibH },
            { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -height + ps.lRibH }, { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -height }];
            let keyname = "lRib" + j;
            Rib[keyname] = lRib;
          }


          // leftWeb
          let lw1 = WebPoint(lwb, lwt, 0, -height); //{x:blwX,y:-height}
          let lw2 = WebPoint(lwb, lwt, gradient, -slabThickness); //{x:tlwX,y:gradient*tlwX - slabThickness}
          let lWeb = PlateRestPoint(lw1, lw2, 0, gradient, -ps.webThk);
          // rightWeb
          let rw1 = WebPoint(rwb, rwt, 0, -height); //{x:brwX,y:-height}
          let rw2 = WebPoint(rwb, rwt, gradient, -slabThickness); //{x:trwX,y:gradient*trwX - slabThickness}
          let rWeb = PlateRestPoint(rw1, rw2, 0, gradient, ps.webThk);
          // bottomplate
          let b1 = { x: lw1.x - sectionInfo.C1, y: -height };
          let b2 = { x: rw1.x + sectionInfo.D1, y: -height };
          let bottomPlate = PlateRestPoint(b1, b2, null, null, -ps.lFlangeThk);
          // TopPlate
          let tl1 = { x: lw2.x - sectionInfo.C, y: lw2.y + gradient * (- sectionInfo.C) };
          let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW) };
          let topPlate1 = PlateRestPoint(tl1, tl2, -1 / gradient, -1 / gradient, ps.uFlangeThk);
          let tr1 = { x: rw2.x + sectionInfo.D, y: rw2.y + gradient * (sectionInfo.D) };
          let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW) };
          let topPlate2 = PlateRestPoint(tr1, tr2, -1 / gradient, -1 / gradient, ps.uFlangeThk);        if (i === 0) {
            forward = { skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib };
          } else {
            backward = { skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib };
          }
        }
        result[k] = { forward, backward };
      }
    }
    return result
  }


  function PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict) {
      let forward = {
          height: 0,
          slabThickness: 0,
          skew: skew,
          uFlangeW: 0,
          uFlangeThk: 0,
          lFlangeThk: 0,
          webThk: 0,
          uRibH: 0,
          uRibThk: 0,
          uRibLO: [],
          lRibH: 0,
          lRibThk: 0,
          lRibLO: [],
      };
      let backward = {
          height: 0,
          slabThickness: 0,
          skew: skew,
          uFlangeW: 0,
          uFlangeThk: 0,
          lFlangeThk: 0,
          webThk: 0,
          uRibH: 0,
          uRibThk: 0,
          uRibLO: [],
          lRibH: 0,
          lRibThk: 0,
          lRibLO: [],
      };

      let R = 0;
      let x1 = 0;
      let deltaH = 0;
      let L = 0;
      let height = 0;
      for (let i = 0; i< girderBaseInfo.height.length;i++){
          let sp = pointDict[girderBaseInfo.height[i][0]];
          let ep = pointDict[girderBaseInfo.height[i][1]];
          if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
              deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3];
              L = ep.masterStationNumber - sp.masterStationNumber;
              if (girderBaseInfo.height[i][4] == "circle"){
                  if (deltaH>0){
                      R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + (R -Math.sqrt(R**2 - x1**2));
                  }else if (deltaH<0){
                      R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] + (R -Math.sqrt(R**2 - x1**2));
                  }else{
                      height = girderBaseInfo.height[i][2];
                  }
              }else if (girderBaseInfo.height[i][4] == "parabola"){
                  if (deltaH>0){
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + deltaH / L**2 * x1**2;
                  }else if (deltaH<0){
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] - deltaH / L**2 * x1**2;
                  }else{
                      height = girderBaseInfo.height[i][2];
                  }
              }else{  //straight
                  x1 = station - sp.masterStationNumber;
                  height = girderBaseInfo.height[i][2] - x1/L * deltaH;
              }
              break;
          }
      }
      forward.height = height;
      backward.height = height;

      // position:0, T:1, H:2
      let slabThickness = 0;
      for (let i = 0; i < slabLayout.length - 1; i++) {
          let ss = pointDict[slabLayout[i][0]].masterStationNumber;
          let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
          if (station >= ss && station <= es) {
              let x = station - ss;
              let l = es - ss;
              slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
          }
      }
     
      forward.slabThickness = slabThickness;
      backward.slabThickness = slabThickness;

      var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if(uFlange.length>0){
          forward.uFlangeThk = uFlange[0][2];
          forward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
      }
      uFlange = girderBaseInfo.uFlange.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(uFlange.length>0){
          backward.uFlangeThk = uFlange[0][2];
          backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
      }

      var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
          });
      if(lFlange.length>0){
          forward.lFlangeThk = lFlange[0][2];
      }
      lFlange = girderBaseInfo.lFlange.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(lFlange.length>0){
          backward.lFlangeThk = lFlange[0][2];
      }

      var web = girderBaseInfo.web.filter(function(element){ 
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
          });
      if(web.length>0){
          forward.webThk = web[0][2];
      }
      web = girderBaseInfo.web.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(web.length>0){
          backward.webThk = web[0][2];
      }

      var uRib = girderBaseInfo.uRib.filter(function(element){ 
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
          });
      if(uRib.length>0){
          forward.uRibThk = uRib[0][2];
          forward.uRibH = uRib[0][3];
          forward.uRibLO = uRib[0][4];
      }
      uRib = girderBaseInfo.uRib.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(uRib.length>0){
          backward.uRibThk = uRib[0][2];
          backward.uRibH = uRib[0][3];
          backward.uRibLO = uRib[0][4];
      }

      var lRib = girderBaseInfo.lRib.filter(function(element){ 
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
          });
      if(lRib.length>0){
          forward.lRibThk = lRib[0][2];
          forward.lRibH = lRib[0][3];
          forward.lRibLO = lRib[0][4];
      }
      lRib = girderBaseInfo.lRib.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(lRib.length>0){
          backward.lRibThk = lRib[0][2];
          backward.lRibH = lRib[0][3];
          backward.lRibLO = lRib[0][4];
      }

      return { forward, backward }
  }

  function SectionPoint(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("girderBaseInfo","girderBaseInfo");
    this.addInput("slabInfo","slabInfo");
    this.addInput("slabLayout","arr");
    this.addOutput("sectionPointDict","sectionPointDict");
  }

  SectionPoint.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const girderBaseInfo = this.getInputData(1);
    const slabInfo = this.getInputData(2);
    const slabLayout = this.getInputData(3);
    let sectionPointDict = SectionPointDict(gridPoint,girderBaseInfo,slabInfo,slabLayout);
    this.setOutputData(0, sectionPointDict);
  };

  function SteelBoxDict2(girderStationList, sectionPointDict) {
    console.log("sb", girderStationList, sectionPointDict);
    let steelBoxDict = {};
    let pk1 = "";
    let pk2 = "";
    let UFi = 1;
    let Bi = 1;
    let LWi = 1;
    let RWi = 1;
    let Ribi = 1;
    let keyname = "";

      for (let i in girderStationList){
        for (let j = 0; j<girderStationList[i].length -1;j++){
          
          let point1 = girderStationList[i][j].point;
          let point2 = girderStationList[i][j+1].point;

          pk1 = girderStationList[i][j].key;
          pk2 = girderStationList[i][j+1].key;

          keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi;
          if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
          let L1 = sectionPointDict[pk1].forward.leftTopPlate;
          let R1 = sectionPointDict[pk1].forward.rightTopPlate;
          let L2 = sectionPointDict[pk2].backward.leftTopPlate;
          let L3 = sectionPointDict[pk2].forward.leftTopPlate;
          let R2 = sectionPointDict[pk2].backward.rightTopPlate;
          let R3 = sectionPointDict[pk2].forward.rightTopPlate;

          if (L1[1].x >= R1[1].x) { //폐합인 경우 
            let C1 = [L1[0], R1[0], R1[3], L1[3]];
            C1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)));
          } else {
            L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
            R1.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point1, element)));
          }
          let FisB = true;
          for (let i in L2) { if (L2[i] !== L3[i] || R2[i] !== R3[i]) { FisB = false; } }
          if (!FisB || pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
            if (L2[1].x >= R2[1].x) { //폐합인 경우 
              let C2 = [L2[0], R2[0], R2[3], L2[3]];
              C2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)));
            } else {
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
              R2.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point2, element)));
            }
          }
          if (pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP") { UFi += 1; }


          keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi;
          if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
          L1 = sectionPointDict[pk1].forward.bottomPlate;
          L2 = sectionPointDict[pk2].backward.bottomPlate;
          L3 = sectionPointDict[pk2].forward.bottomPlate;

          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));

          FisB = true;
          for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false; } }
          if (!FisB || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6" ) {
            L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
          }
          if (pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP") { Bi += 1; }

          keyname = "G"+(i*1+1).toString()+"LeftWeB" + LWi;
          if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          L1 = sectionPointDict[pk1].forward.lWeb;
          L2 = sectionPointDict[pk2].backward.lWeb;
          L3 = sectionPointDict[pk2].forward.lWeb;
          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
          FisB = true;
          for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false;}}
          if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || pk2.substr(2, 2) === "K6"){
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
          }
          if(pk2.substr(2,2)==="LW" || pk2.substr(2,2)==="SP" ){ LWi +=1; }

          keyname = "G"+(i*1+1).toString()+"RightWeB" + RWi;
          if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          L1 = sectionPointDict[pk1].forward.rWeb;
          L2 = sectionPointDict[pk2].backward.rWeb;
          L3 = sectionPointDict[pk2].forward.rWeb;
          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
          FisB = true;
          for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false;}}
          if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || pk2.substr(2, 2) === "K6"){
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
          }
          if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){ RWi +=1; }

          let RibList = [];
          for (let ii in sectionPointDict[pk1].forward) {
            if (ii.includes("Rib"))
              RibList.push(ii);
          }
          for (let Ribkey of RibList) {
            keyname = "G" + (i * 1 + 1).toString() + "lRib" + Ribi;
            if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
            L1 = sectionPointDict[pk1].forward[Ribkey];
            L2 = sectionPointDict[pk2].backward[Ribkey];
            L3 = sectionPointDict[pk2].forward[Ribkey];
            L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
            FisB = true;
            for (let i in L2) { FisB = L3 ? (L2[i] !== L3[i] ? false : true) : false; }
            if (!FisB || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
              Ribi += 1;
            }
            // if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){  }
          }

        }
      }
    // }

    return steelBoxDict
  }

  // import { sceneAdder } from "global";

  function SteelBox(){
    this.addInput("girderStation","girderStation");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addOutput("steelBoxDict","steelBoxDict");
  }

  SteelBox.prototype.onExecute = function() {
    const girderStation = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
    const result = SteelBoxDict2(girderStation, sectionPointDict);
    this.setOutputData(0, result);
  };

  function DiaShapeDict(
    sectionPointDict,
    diaphragmLayout,
    diaphragmSectionList
  ) {
    const position = 0;
    const section = 1 ;
    let result = {};
    for (let i = 0; i < diaphragmLayout.length; i++) {
      let gridkey = diaphragmLayout[i][position];
      let diaSection = diaphragmSectionList[diaphragmLayout[i][section]];
      let webPoints = [
        sectionPointDict[gridkey].forward.lWeb[0],
        sectionPointDict[gridkey].forward.lWeb[1],
        sectionPointDict[gridkey].forward.rWeb[0],
        sectionPointDict[gridkey].forward.rWeb[1]
      ];
      let uflangePoints = [
        sectionPointDict[gridkey].forward.leftTopPlate[1],
        sectionPointDict[gridkey].forward.leftTopPlate[2],
        sectionPointDict[gridkey].forward.rightTopPlate[1],
        sectionPointDict[gridkey].forward.rightTopPlate[2]
      ];
      let skew = sectionPointDict[gridkey].forward.skew;
      if (diaphragmLayout[i][section] == "diaType1") {
        result[gridkey] = diaphragmSection(
          webPoints,
          skew,
          uflangePoints,
          diaSection
        );
      } else if (diaphragmLayout[i][section] == "diaType2") {
        result[gridkey] = diaphragmSection2(
          webPoints,
          skew,
          uflangePoints,
          diaSection
        );
      }
    }
    return result;
  }

  function VstiffShapeDict(
    sectionPointDict,
    vStiffLayout,
    vStiffSectionList
  ) {
    let result = {};
    for (let i = 0; i < vStiffLayout.length; i++) {
      let gridkey = vStiffLayout[i].position;
      let vSection = vStiffSectionList[vStiffLayout[i].section];
      let webPoints = [
        sectionPointDict[gridkey].forward.lWeb[0],
        sectionPointDict[gridkey].forward.lWeb[1],
        sectionPointDict[gridkey].forward.rWeb[0],
        sectionPointDict[gridkey].forward.rWeb[1]
      ];
      let uflangePoints = [
        sectionPointDict[gridkey].forward.leftTopPlate[1],
        sectionPointDict[gridkey].forward.leftTopPlate[2],
        sectionPointDict[gridkey].forward.rightTopPlate[1],
        sectionPointDict[gridkey].forward.rightTopPlate[2]
      ];
      let skew = sectionPointDict[gridkey].forward.skew;
      result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection);
    }
    return result;
  }

  function diaphragmSection(webPoints, skew, uflangePoint, ds){ //ribPoint needed
      // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
      let result = {};
      const bl = webPoints[0];
      const tl = webPoints[1];
      const br = webPoints[2];
      const tr = webPoints[3];
      const rotationY = (skew - 90)*Math.PI/180;
      const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
      const rwCot = (tr.x - br.x)/(tr.y-br.y);
      const gradient = (tr.y- tl.y)/(tr.x-tl.x);

      ///lower stiffener
      let lowerPlate = [
        {x:bl.x + lwCot * ds.lowerHeight,y:bl.y + ds.lowerHeight}, bl, br,
        {x:br.x + rwCot * ds.lowerHeight,y:br.y + ds.lowerHeight}
      ];
      let lowerPoints = [];
      lowerPoints.push(lowerPlate[0]);
      lowerPoints = lowerPoints.concat(scallop(tl,bl,br,ds.scallopRadius,4));
      //// longitudinal stiffner holes
      for (let i=0; i<ds.longiRibRayout.length;i++){
        lowerPoints.push({x:ds.longiRibRayout[i] - ds.ribHoleD, y:lowerPlate[1].y});
        let curve = new global.THREE.ArcCurve(ds.longiRibRayout[i],lowerPlate[1].y + ds.longiRibHeight, ds.ribHoleR, Math.PI,0,true);
        let dummyVectors = curve.getPoints(8);
        for (let i = 0; i< dummyVectors.length;i++){
          lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y});
        }
        lowerPoints.push({x:ds.longiRibRayout[i] + ds.ribHoleD,y:lowerPlate[1].y});
      }
      lowerPoints = lowerPoints.concat(scallop(bl,br,tr,ds.scallopRadius,4));
      lowerPoints.push(lowerPlate[3]);
      let lowerTopPoints = [lowerPlate[0],
                            {x:bl.x + lwCot * (ds.lowerHeight+ds.lowerTopThickness), y:bl.y + (ds.lowerHeight+ds.lowerTopThickness)},
                            {x:br.x + rwCot * (ds.lowerHeight+ds.lowerTopThickness), y:bl.y + (ds.lowerHeight+ds.lowerTopThickness)},
                            lowerPlate[3]];
      result["lowerTopShape"] = {
        points:lowerTopPoints,Thickness:ds.lowerTopwidth,z:-ds.lowerTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size : PlateSize2(lowerPlate,1,ds.lowerTopThickness,ds.lowerTopwidth),
        anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
      };
      let lowerweldingLine = [lowerPlate[0],lowerPlate[1],lowerPlate[2],lowerPlate[3]];
      result["lowershape"]= {
        points:lowerPoints,Thickness:ds.lowerThickness,z:-ds.lowerThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[], 
        size: PlateSize(lowerPlate,1,ds.lowerThickness),
        anchor:[[lowerPlate[0].x,lowerPlate[0].y - 50],[lowerPlate[3].x,lowerPlate[3].y - 50]],
        welding:[{Line:lowerweldingLine,type:"FF",value1:6}]
      };
      ///upper stiffener
      let upperPlate = [{x:tl.x, y:tl.y},{x:tl.x - lwCot * ds.upperHeight,y: tl.y -ds.upperHeight},
                        {x:tr.x - rwCot * ds.upperHeight,y: tr.y -ds.upperHeight},{x:tr.x, y:tr.y}];
      let upperPoints = [...scallop(upperPlate[3],upperPlate[0],upperPlate[1],ds.scallopRadius,4),
        upperPlate[1],upperPlate[2],...scallop(upperPlate[2],upperPlate[3],upperPlate[0],ds.scallopRadius,4)];

      result["upper"] = {
        points:upperPoints,Thickness:ds.upperThickness,z:-ds.upperThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize(upperPlate,1,ds.upperThickness),
        anchor:[[upperPlate[0].x,upperPlate[0].y - 50],[upperPlate[3].x,upperPlate[3].y - 50]]
      }; 
      //upperTopPlate
      
      let gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 );
      let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x);
      let gtan = (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x);
      if (uflangePoint[0].x < uflangePoint[2].x){
      let upperTopPoints = PlateRestPoint(uflangePoint[0],uflangePoint[2],gtan,gtan,ds.upperTopThickness);
      result["upperTopShape"]= {
        points:upperTopPoints,Thickness:ds.upperTopwidth,z:-ds.upperTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize2(upperTopPoints,0,ds.upperTopThickness,ds.upperTopwidth),
        anchor:[[upperTopPoints[0].x,upperTopPoints[0].y + 50],[upperTopPoints[1].x,upperTopPoints[1].y + 50]]
      };
    }
      ////left side stiffner
      let leftPlate = PlateRestPoint(
        WebPoint(bl,tl,0,bl.y + (ds.lowerHeight+ds.lowerTopThickness)),
        WebPoint(bl,tl,0,tl.y - (ds.upperHeight+ds.leftsideTopThickness)*gsin),0,gradient,ds.sideHeight );
      let leftweldingLine = [leftPlate[3],leftPlate[0],leftPlate[1],leftPlate[2]];
      result["leftPlateShape"] = {points:leftPlate, Thickness:ds.sideThickness,z:-ds.sideThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize(leftPlate,0,ds.sideThickness),
        anchor:[[leftPlate[0].x + 50,leftPlate[0].y],[leftPlate[1].x  + 50,leftPlate[1].y]],
        welding:[{Line:leftweldingLine,type:"FF",value1:6}]
      };

      
  //   ////right side stiffner
      let rightPlate = PlateRestPoint(
        WebPoint(br,tr,0,br.y + (ds.lowerHeight+ds.lowerTopThickness)),
        WebPoint(br,tr,0,tr.y - (ds.upperHeight+ds.leftsideTopThickness)*gsin),0,gradient,-ds.sideHeight );
      result["rightPlateShape"] = {points:rightPlate, Thickness:ds.sideThickness,z:-ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize(rightPlate,0,ds.sideThickness),
        anchor:[[rightPlate[0].x - 50,rightPlate[0].y],[rightPlate[1].x  - 50,rightPlate[1].y]]
      };
      ////leftside top plate
      let leftTopPlate = PlateRestPoint(
        upperPlate[1],{x:upperPlate[1].x + ds.leftsideTopwidth*gsin, y: upperPlate[1].y - ds.leftsideTopwidth * gcos},
        1/lwCot,-1/gradient,-ds.leftsideTopThickness);
      result["leftTopPlateShape"] = {points:leftTopPlate, Thickness:ds.leftsideToplength,z:-ds.leftsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize2(leftTopPlate,0,ds.leftsideTopThickness,ds.leftsideToplength),
        anchor:[[leftTopPlate[0].x + 50,leftTopPlate[0].y+50],[leftTopPlate[1].x  + 50,leftTopPlate[1].y+50]]
      };
      ////rightside top plate
      let rightTopPlate = PlateRestPoint(
        upperPlate[2],{x:upperPlate[2].x - ds.rightsideTopwidth*gsin, y: upperPlate[2].y + ds.rightsideTopwidth * gcos},
        1/rwCot,-1/gradient,-ds.rightsideTopThickness);
      result["rightTopPlateShape"] = {points:rightTopPlate, Thickness:ds.rightsideToplength,z:-ds.rightsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size: PlateSize2(rightTopPlate,0,ds.rightsideTopThickness,ds.rightsideToplength),
        anchor:[[rightTopPlate[1].x  - 80,rightTopPlate[1].y+50],[rightTopPlate[0].x - 80,rightTopPlate[0].y + 50]]
      };
      // k-frame diaphragm
      let leftline =  [{x:-ds.spc*gsin,y:-ds.spc*gcos},lowerTopPoints[1]];
      let lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x)**2 + (leftline[1].y - leftline[0].y)**2);
      let ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x);
      let lsin = lcos * ltan;
      // 슬래브 기준두께에 따라 브레이싱의 상단좌표가 이동해야 하나, 현재 기준은 0,0을 기준점으로 하고 있어 수정이 필요함 20.03.17 by drlim
      let newleftline = [
        {x:leftline[0].x - (ds.spc - lcos * ds.pts[0]) / ltan, y: leftline[0].y - (ds.spc - lcos * ds.pts[0])},
        {x:leftline[1].x + (ds.spc - lsin * ds.pts[0]), y: leftline[1].y + ltan * (ds.spc - lsin * ds.pts[0])}
      ];
      let [leftframe1,leftframe2] = Kframe(newleftline[1],newleftline[0],0,0,ds.pts);
      result["leftframe1"] = {points:leftframe1, Thickness:ds.pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]};
      result["leftframe2"] = {points:leftframe2, Thickness:ds.pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size:{Label:"L-100x100x10x"+PointLength(...newleftline).toFixed(0)},
        anchor:[[newleftline[1].x-20,newleftline[1].y],[newleftline[0].x-20,newleftline[0].y]]};
      
      let rightline = [{x:ds.spc*gsin,y:ds.spc*gcos},lowerTopPoints[2]];
      let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2);
      let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x);
      let rsin = rcos * rtan;
      let newrightline = [
        {x:rightline[0].x - (ds.spc + rcos * ds.pts[0]) / rtan, y: rightline[0].y - (ds.spc + rcos * ds.pts[0])},
        {x:rightline[1].x - (ds.spc - rsin * ds.pts[0]), y: rightline[1].y - rtan * (ds.spc - rsin * ds.pts[0])}
      ];
      let [rightframe1,rightframe2] = Kframe(newrightline[0],newrightline[1],0,0,ds.pts);
      result["rightframe1"] = {points:rightframe1, Thickness:ds.pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]};
      result["rightframe2"] = {points:rightframe2, Thickness:ds.pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size:{Label:"L-100x100x10x"+PointLength(...newrightline).toFixed(0)},
        anchor:[[newrightline[0].x+20,newrightline[0].y],[newrightline[1].x+20,newrightline[1].y]]
      };
        return result
    }

    function diaphragmSection2(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
      // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
      let result = {};
      const plateThickness = diaSection.plateThickness;
      const holeBottomOffset = diaSection.holeBottomOffset;
      const holeRightOffset = diaSection.holeRightOffset;
      const holeFilletR = diaSection.holeFilletR;
      const holeHeight = diaSection.holeHeight;
      const holeWidth = diaSection.holeWidth;
      const vStiffThickness = diaSection.vStiffThickness;
      const vStiffWidth = diaSection.vStiffWidth;
      const vStiffLayout = diaSection.vStiffLayout;
      const topPlateWidth = diaSection.topPlateWidth;
      const topPlateThickness = diaSection.topPlateThickness;
      
      const hStiffThickness = diaSection.hStiffThickness;
      const hStiffWidth = diaSection.hStiffWidth;
      const hStiffBottomOffset = diaSection.hStiffBottomOffset;
      // let longiRibHeight = diaSection.longiRibHeight;
      // let longiRibRayout = diaSection.longiRibRayout;
      const holeVstiffnerThickness = diaSection.holeVstiffnerThickness;
      const holeVstiffnerhight = diaSection.holeVstiffnerhight;
      const holeVstiffnerLength = diaSection.holeVstiffnerLength;
      const holeHstiffnerThickness = diaSection.holeHstiffnerThickness;
      const holeHstiffnerHeight = diaSection.holeHstiffnerHeight;
      const holeHstiffnerLength = diaSection.holeHstiffnerLength;
      const holeStiffSpacing = diaSection.holeStiffSpacing;
      // added letiables
      let scallopRadius = diaSection.scallopRadius;


      const bl = webPoints[0];
      const tl = webPoints[1];
      const br = webPoints[2];
      const tr = webPoints[3];

      const gradient =  (tr.y - tl.y) / (tr.x - tl.x);

      const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
      const rwCot = (tr.x - br.x)/(tr.y-br.y);
      const cosec = Math.abs(1/Math.sin(skew * Math.PI/180));
      const cot = Math.abs(1/Math.tan(skew * Math.PI/180));
      const rotationY = (skew - 90)*Math.PI/180;

      let vstiffX1 = (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness;
      let vstiffX2 = holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness;
      let vstiffX3 = vStiffLayout[0] - vStiffThickness / 2;
      let vstiffX4 = vStiffLayout[0] + vStiffThickness / 2;
      let vstiffX5 = vStiffLayout[1] - vStiffThickness / 2;
      let vstiffX6 = vStiffLayout[1] + vStiffThickness / 2;

      let hStiff1 = [
        {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
        {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (plateThickness/2) * cosec},
        {x: vstiffX1 ,y:-(vstiffX1) * cot - (plateThickness/2) * cosec},
        {x: vstiffX1 ,y:-(vstiffX1) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
      ];
      let hStiff2 = [
        {x: vstiffX2,y: -(vstiffX2) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
        {x: vstiffX2,y: -(vstiffX2) * cot - (plateThickness/2) * cosec},
        {x: vstiffX3 ,y:-(vstiffX3) * cot - (plateThickness/2) * cosec},
        {x: vstiffX3 ,y:-(vstiffX3) * cot - (hStiffWidth + plateThickness/2) * cosec},
      ];
      let hStiff3 = [
        {x: vstiffX4,y: -(vstiffX4) * cot - (hStiffWidth + plateThickness/2) * cosec},
        {x: vstiffX4,y: -(vstiffX4) * cot - (plateThickness/2) * cosec},
        {x: vstiffX5 ,y:-(vstiffX5) * cot - (plateThickness/2) * cosec},
        {x: vstiffX5 ,y:-(vstiffX5) * cot - (hStiffWidth + plateThickness/2) * cosec},
      ];
      let hStiff4 = [
        {x: vstiffX6,y: -(vstiffX6) * cot - (hStiffWidth + plateThickness/2) * cosec},
        {x: vstiffX6,y: -(vstiffX6) * cot - (plateThickness/2) * cosec},
        {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (plateThickness/2) * cosec},
        {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
      ];
      result['hStiff1'] = {points:hStiff1,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff2'] = {points:hStiff2,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff3'] = {points:hStiff3,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff4'] = {points:hStiff4,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};

      let hStiff5 = [
        {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
        {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (plateThickness/2) * cosec},
        {x: vstiffX1 ,y:-(vstiffX1) * cot + (plateThickness/2) * cosec},
        {x: vstiffX1 ,y:-(vstiffX1) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
      ];
      let hStiff6 = [
        {x: vstiffX2,y: -(vstiffX2) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
        {x: vstiffX2,y: -(vstiffX2) * cot + (plateThickness/2) * cosec},
        {x: vstiffX3 ,y:-(vstiffX3) * cot + (plateThickness/2) * cosec},
        {x: vstiffX3 ,y:-(vstiffX3) * cot + (hStiffWidth + plateThickness/2) * cosec},
      ];
      let hStiff7 = [
        {x: vstiffX4,y: -(vstiffX4) * cot + (hStiffWidth + plateThickness/2) * cosec},
        {x: vstiffX4,y: -(vstiffX4) * cot + (plateThickness/2) * cosec},
        {x: vstiffX5 ,y:-(vstiffX5) * cot + (plateThickness/2) * cosec},
        {x: vstiffX5 ,y:-(vstiffX5) * cot + (hStiffWidth + plateThickness/2) * cosec},
      ];
      let hStiff8 = [
        {x: vstiffX6,y: -(vstiffX6) * cot + (hStiffWidth + plateThickness/2) * cosec},
        {x: vstiffX6,y: -(vstiffX6) * cot + (plateThickness/2) * cosec},
        {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (plateThickness/2) * cosec},
        {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
      ];
      result['hStiff5'] = {points:hStiff5,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff6'] = {points:hStiff6,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff7'] = {points:hStiff7,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
      result['hStiff8'] = {points:hStiff8,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};

      // let ribHoleD = diaSection.ribHoleD;
      // let ribHoleR = diaSection.ribHoleR;

      // hole stiffner
      let holeVStiff1 = [
        {x: holeRightOffset / cosec + holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
        {x: holeRightOffset / cosec+ holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
        {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
        {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
      ];
      result['holeVStiff1'] = { 
        points:holeVStiff1,
        Thickness: holeVstiffnerhight ,
        z: holeVStiff1[0].x * cot + plateThickness/2,
        rotationX:Math.PI/2,
        rotationY:0,
        hole:[]};

      let holeVStiff2 = [
        {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
        {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
        {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
        {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
      ];
      result['holeVStiff2'] = { 
        points:holeVStiff2,
        Thickness: holeVstiffnerhight ,
        z: holeVStiff2[0].x * cot + plateThickness/2,
        rotationX:Math.PI/2,
        rotationY:0,
        hole:[]};

      let holeHStiff1 = [
          {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot},
          {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot},
          {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
          {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
        ];
      result['holeHStiff1'] = { 
        points:holeHStiff1,
        Thickness: holeHstiffnerThickness ,
        z: bl.y + holeBottomOffset + holeHeight + holeStiffSpacing,
        rotationX:0,
        rotationY:0,
        hole:[]};

      result['holeHStiff2'] = { 
        points:holeHStiff1,
        Thickness: - holeHstiffnerThickness ,
        z: bl.y + holeBottomOffset - holeStiffSpacing,
        rotationX:0,
        rotationY:0,
        hole:[]};


      // vertical stiffener 
      for (let i = 0; i<vStiffLayout.length;i++){
        let name = 'verticalStiffner' + (i+1);
        let Points = [ 
          {x:vStiffLayout[i] - vStiffThickness / 2,y: bl.y},
          {x:vStiffLayout[i] + vStiffThickness / 2,y: bl.y},
          {x:vStiffLayout[i] + vStiffThickness / 2,y: tl.y  + ((vStiffLayout[i] + vStiffThickness / 2) - tl.x) * gradient},
          {x:vStiffLayout[i] - vStiffThickness / 2,y: tl.y + ((vStiffLayout[i] - vStiffThickness / 2)- tl.x) * gradient},
        ];
        result[name] = { 
            points:Points,
            Thickness:vStiffWidth,
            z: vStiffLayout[i] * cot - vStiffWidth/2,
            rotationX:Math.PI/2,
            rotationY:0,
            hole:[]};
      }

      // topPlate
      if (uflangePoint[0].x < uflangePoint[2].x){
      let topPlate = [
        {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot + topPlateWidth/2 *cosec },
        {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot - topPlateWidth/2 *cosec },
        {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot - topPlateWidth/2 *cosec },
        {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot + topPlateWidth/2 *cosec },
      ];
      result['topPlate'] = { 
        points:topPlate,
        Thickness:topPlateThickness,
        z: tl.y - tl.x * gradient,
        rotationX:0,
        rotationY:-Math.atan(gradient),
        hole:[]};
      }

      ///lower stiffener
      let mainPlate = [
        {x: tl.x * cosec, y:tl.y}, 
        {x: bl.x * cosec, y:bl.y}, 
        {x: br.x * cosec, y:br.y}, 
        {x: tr.x * cosec, y:tr.y}, 
      ];
      let diaPoints = [];
      diaPoints = diaPoints.concat(scallop(mainPlate[3],mainPlate[0],mainPlate[1],scallopRadius,4));
      // points.push(plate[1]);
      diaPoints = diaPoints.concat(scallop(mainPlate[0],mainPlate[1],mainPlate[2],scallopRadius,4));
      //// longitudinal stiffner holes
      // for (let i=0; i<longiRibRayout.length;i++){
      //   lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
      //   let curve = new THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
      //   let dummyVectors = curve.getPoints(8)
      //   for (let i = 0; i< dummyVectors.length;i++){
      //     lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
      //   }
      //   lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
      // }
      ////
      diaPoints = diaPoints.concat(scallop(mainPlate[1],mainPlate[2],mainPlate[3],scallopRadius,4));
      diaPoints = diaPoints.concat(scallop(mainPlate[2],mainPlate[3],mainPlate[0],scallopRadius,4));
      ////

      let holePoints = [];
      let holeRect = [
        {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset },
        {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset },
        {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
        {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
      ];
      holePoints = holePoints.concat(Fillet2D(holeRect[0], holeRect[1], holeRect[2], holeFilletR, 4));
      holePoints = holePoints.concat(Fillet2D(holeRect[1], holeRect[2], holeRect[3], holeFilletR, 4));
      holePoints = holePoints.concat(Fillet2D(holeRect[2], holeRect[3], holeRect[0], holeFilletR, 4));
      holePoints = holePoints.concat(Fillet2D(holeRect[3], holeRect[0], holeRect[1], holeFilletR, 4));
      result['mainPlate'] = {points:diaPoints,Thickness:plateThickness,z:- plateThickness/2,rotationX:Math.PI/2,rotationY:rotationY, hole:holePoints};
        
      return result
    }

    function vStiffSection(webPoints, skew, uflangePoint, vSection){

      const bl = webPoints[0];
      const tl = webPoints[1];
      const br = webPoints[2];
      const tr = webPoints[3];
      let gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 );
      let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x);
      const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
      const rwCot = (tr.x - br.x)/(tr.y-br.y);
      const lcos = (tl.x - bl.x) / Math.sqrt((tl.x - bl.x)**2 + (tl.y - bl.y)**2);
      const lsin = lcos / lwCot;
      const rcos = (tr.x - br.x) / Math.sqrt((tr.x - br.x)**2 + (tr.y - br.y)**2);
      const rsin = rcos / rwCot;

      let sideHeight = vSection.sideHeight;
      let sideThickness = vSection.sideThickness;
      let upperHeight = vSection.upperHeight;
      let bottomOffset = vSection.bottomOffset;
      let scallopRadius = vSection.scallopRadius;
      let sideScallopOffset = vSection.sideScallopOffset;
      //L100x100x10 section point, origin = (0,0)
      let spc = vSection.spc;
      let pts = vSection.pts;
      let rotationY = (skew - 90)*Math.PI/180;
    ///left stiffener
      let leftplate = [
        tl,
        {x:bl.x + lwCot * bottomOffset, y : bl.y + bottomOffset },
        {x:bl.x + lwCot * bottomOffset + lsin*sideHeight, y : bl.y + bottomOffset - lcos*sideHeight},
        {x:tl.x + gsin * sideHeight, y : tl.y + gcos * sideHeight },
      ];
      let leftPoints = [];
      leftPoints = leftPoints.concat(scallop(leftplate[3],leftplate[0],leftplate[1],scallopRadius,4));
      leftPoints.push(leftplate[1]);
      leftPoints = leftPoints.concat(scallop(leftplate[1],leftplate[2],leftplate[3],sideHeight-sideScallopOffset,1));
      leftPoints.push(leftplate[3]);
    
      ///right stiffener
      let rightplate = [
        tr,
        {x:br.x + rwCot * bottomOffset, y : br.y + bottomOffset },
        {x:br.x + rwCot * bottomOffset - rsin * sideHeight, y : br.y + bottomOffset + rcos*sideHeight},
        {x:tr.x - gsin * sideHeight, y : tr.y - gcos * sideHeight },
      ];
      let rightPoints = [...scallop(rightplate[3],rightplate[0],rightplate[1],scallopRadius,4), rightplate[1],
                        ...scallop(rightplate[1],rightplate[2],rightplate[3],sideHeight-sideScallopOffset,1), rightplate[3]];
      ////upper bracing
      let node1 = {x:tl.x - lwCot * upperHeight + gsin * spc , y: tl.y - upperHeight + gcos * spc};
      let node2 = {x:tr.x - rwCot * upperHeight - gsin * spc , y: tr.y - upperHeight - gcos * spc};
      let [upperframe1,upperframe2] = Kframe(node1,node2,0,0,pts);
    return {
      leftshape: {points:leftPoints,Thickness:sideThickness,z: -sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
      rightShape: {points:rightPoints,Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
      upperframe1:{points:upperframe1, Thickness:pts[3],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
      upperframe2:{points:upperframe2, Thickness:pts[4],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
     }
  }

  // import { LiteGraph, meshArr } from "global";


  function DiaDict(){
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("diaphragmLayout","arr");
    this.addInput("diaphragmSectionList","diaphragmSectionList");
    this.addOutput("diaDict","diaDict");
  }

  DiaDict.prototype.onExecute = function() {
    const sectionPointDict = this.getInputData(0);
    const diaphragmLayout = this.getInputData(1);
    const diaphragmSectionList = this.getInputData(2);
    const result = DiaShapeDict(sectionPointDict,diaphragmLayout,diaphragmSectionList);
    this.setOutputData(0, result);
  };

  function VstiffDict(){
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("vStiffLayout","vStiffLayout");
    this.addInput("vStiffSectionList","vStiffSectionList");
    this.addOutput("diaDict","diaDict");
  }

  VstiffDict.prototype.onExecute = function() {
    const sectionPointDict = this.getInputData(0);
    const vStiffLayout = this.getInputData(1);
    const vStiffSectionList = this.getInputData(2);
    const result = VstiffShapeDict(sectionPointDict,vStiffLayout,vStiffSectionList);
    this.setOutputData(0, result);
  };

  function LineView(linepoints, initPoint, color){
      var group = new global.THREE.Group();
      var geometry = new global.THREE.Geometry();
      const xInit = initPoint.x;
      const yInit = initPoint.y;
      const zInit = initPoint.z;
      for (let i = 0; i<linepoints.length;i++){
          geometry.vertices.push( 
          new global.THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
      }
      var colorCode = color? color:0xffff00;
      var line = new global.THREE.Line(
          geometry, new global.THREE.LineBasicMaterial( {color: colorCode} )
      );
      group.add(line);
      return group
  }

  function SteelBoxView(steelBoxDict,initPoint){
      let group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0x00ff00,
      //     emissive: 0x44aa44,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      //   } );
      let meshMaterial = new global.THREE.MeshNormalMaterial();
          meshMaterial.side = global.THREE.DoubleSide;
      for (let key in steelBoxDict){
          
          steelBoxDict[key]["points"].forEach(function(plist){
              if(plist.length>0){
              let geometry = new global.THREE.Geometry();
              for (let i = 0; i< plist.length;i++){
                  geometry.vertices.push(new global.THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z));
              }
          
              for (let i = 0; i< plist.length/4 -1;i++){
                  for (let j= 0; j<4;j++){
                      let k = j+1 === 4? 0: j+1;
                      geometry.faces.push(new global.THREE.Face3(i*4+j,i*4+k,(i+1)*4+j));
                      geometry.faces.push(new global.THREE.Face3(i*4+k,(i+1)*4+k,(i+1)*4+j));
                  }
                  if (i===0){
                      geometry.faces.push(new global.THREE.Face3(0,1,2));
                      geometry.faces.push(new global.THREE.Face3(0,2,3));
                  }else if(i===(plist.length/4 -2)){
                      geometry.faces.push(new global.THREE.Face3((i+1)*4,(i+1)*4+1,(i+1)*4+2));
                      geometry.faces.push(new global.THREE.Face3((i+1)*4,(i+1)*4+2,(i+1)*4+3));
                  }
              }
              
              geometry.computeFaceNormals();
              group.add( new global.THREE.Mesh(geometry,meshMaterial) );
              }
          });
      }
      return group
  }

  function DiaView(nameToPointDict, diaDict,initPoint){
      var group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0x00ffff,
      //     emissive: 0x44aaaa,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      //   } );
      var meshMaterial = new global.THREE.MeshNormalMaterial();
      for (let diakey in diaDict){
         let point = nameToPointDict[diakey];
         for (let partkey in diaDict[diakey]){
         let shapeNode = diaDict[diakey][partkey].points;
         let Thickness = diaDict[diakey][partkey].Thickness;
         let zPosition = diaDict[diakey][partkey].z;
         let rotationY = diaDict[diakey][partkey].rotationY;
         let rotationX = diaDict[diakey][partkey].rotationX;
         let hole = diaDict[diakey][partkey].hole;
         group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
          }
      }
      return group
  }

  function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial){
      var shape = new global.THREE.Shape();
      var shapeNodeVectors = [];
      for (let i = 0; i<shapeNode.length;i++){
          shapeNodeVectors.push(new global.THREE.Vector2( shapeNode[i].x,shapeNode[i].y));
      }
      shape.setFromPoints(shapeNodeVectors);
      if (hole.length > 0){
          var holeVectors = [];
          for (let i = 0; i<hole.length;i++){
              holeVectors.push(new global.THREE.Vector2( hole[i].x, hole[i].y));
          }
          var holeShape = new global.THREE.Shape();
          holeShape.setFromPoints(holeVectors);
          shape.holes.push(holeShape);
      }

      var geometry = new global.THREE.ExtrudeBufferGeometry(shape,{depth: Thickness, steps: 1,bevelEnabled: false});
      var mesh = new global.THREE.Mesh(geometry, meshMaterial);
      var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2;  //+ 
      
      mesh.rotation.set(rotationX,rotationY,0); //(rotationY - 90)*Math.PI/180
      mesh.rotateOnWorldAxis(new global.THREE.Vector3(0,0,1),rad);
      mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z);
      mesh.translateZ(zPosition);
      return mesh
  }

  function LineViewer(){
    this.addInput("points","points");
    this.addInput("initPoint","point");
    this.addInput("color","number");
  }
  LineViewer.prototype.onExecute = function() {
  };

  LineViewer.prototype.on3DExecute = function() {
    const points = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const color = this.getInputData(2);
    let mesh = LineView(points,initPoint,color);
    global.sceneAdder({id:0,mesh:mesh});
  };

  function SteelPlateView(){
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("Point","Point");
  }

  SteelPlateView.prototype.onExecute = function() {
    const steeBoxDict = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const group = SteelBoxView(steeBoxDict,initPoint);
    global.sceneAdder({ id: 0, mesh: group}); 
  };

  function DiaPhragmView(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("diaDict","diaDict");
    this.addInput("Point","Point");
  }

  DiaPhragmView.prototype.onExecute = function() {
    const pointDict = this.getInputData(0);
    const diaDict = this.getInputData(1);
    const initPoint = this.getInputData(2);
    const group = DiaView(pointDict, diaDict,initPoint);
    global.sceneAdder({ id: 0, mesh: group}); 
  };



  function InitPoint(){
    this.addInput("gridPoint","gridPoint");
    this.addOutput("Point","Point");
  }

  InitPoint.prototype.onExecute = function() {
    this.getInputData(0);
    this.setOutputData(0, this.getInputData(0)["G1S1"]);
  };

  // import { defaultValues } from "./defaultValues";

  global.LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
  global.LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
  global.LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
  global.LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
  global.LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
  global.LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);

  global.LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
  global.LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);



  global.LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
  global.LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
  global.LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
  global.LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);


  // const {
  //   horizon,
  //   vertical,
  //   superElevation,
  //   girderLayoutInput,
  //   SEShape,
  //   girderBaseInfo,
  //   xbeamLayout,
  //   xbeamSectionList,
  //   diaphragmLayout,
  //   diaphragmSectionList,
  //   vStiffLayout,
  //   vStiffSectionList,
  //   hBracingLayout,
  //   hBracingSectionList
  // } = defaultValues;

  // function HorizonInput(){
  //   this.addOutput("horizon","horizon")
  // }
  // HorizonInput.prototype.onExecute = function() {
  //   this.setOutputData(0,horizon)
  // }
  // LiteGraph.registerNodeType("nexivil/Horizon", HorizonInput);

}(global));
