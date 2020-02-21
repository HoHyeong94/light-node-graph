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

  function HorizonInput(){
    this.addOutput("horizon","horizon");
  }
  HorizonInput.prototype.onExecute = function() {
    this.setOutputData(0,horizon);
  };
  global.LiteGraph.registerNodeType("nexivil/Horizon", HorizonInput);

  function VerticalInput(){
    this.addOutput("vertical","vertical");
  }
  VerticalInput.prototype.onExecute = function() {
    this.setOutputData(0,vertical);
  };
  global.LiteGraph.registerNodeType("nexivil/vertical", VerticalInput);

  function SuperElevationInput(){
    this.addOutput("superElevation","superElevation");
  }
  SuperElevationInput.prototype.onExecute = function() {
    this.setOutputData(0,superElevation);
  };
  global.LiteGraph.registerNodeType("nexivil/superElevation", SuperElevationInput);

  function Line(){
    this.addInput("horizon","horizon");
    this.addInput("vertical","vertical");
    this.addInput("superElevation","superElevation");
    this.addOutput("points","points");
  }
  Line.prototype.onExecute = function() {

    const horizonDataList = this.getInputData(0);
    const verticalDataList = this.getInputData(1);
    const superElevation = this.getInputData(2);
    const beginStation = 769452.42;
    const slaveOrMaster = true;
    const input = { beginStation, horizonDataList, slaveOrMaster };

    let line = LineGenerator(input);
    let zPosition = 0;
    //   let line2 = OffsetLine(20,line)
    for (let i = 0; i < line.points.length; i++) {
      zPosition = VerticalPositionGenerator(
        verticalDataList,
        superElevation,
        line.points[i]
      ).elevation;
      line.points[i].z = zPosition;
    }
    this.setOutputData(0,line.points);
  };
  global.LiteGraph.registerNodeType("nexivil/lineGenerator", Line);


  function LineView(){
    this.addInput("points","points");
  }

  LineView.prototype.onExecute = function() {
    const points = this.getInputData(0);
    const initPoint = points[0];
    console.log("check01",points);
    const group = LineToThree(points,initPoint);
    global.meshArr.current.push({ id: 0, mesh: group}); 
  };

  global.LiteGraph.registerNodeType("nexivil/lineView", LineView);

  function LineToThree(linepoints, initPoint){
      var group = new global.THREE.Group();
      var geometry = new global.THREE.Geometry();
      const xInit = initPoint.x;
      const yInit = initPoint.y;
      const zInit = initPoint.z;
      for (let i = 0; i<linepoints.length;i++){
          geometry.vertices.push( 
          new global.THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
      }
      var line = new global.THREE.Line(
          geometry, new global.THREE.LineBasicMaterial( {color: 0xffff00} )
      );
      group.add(line);
      return group
  }


  const LineGenerator = inputs => {
    // console.time("for loop");
    let lineResult = {
      vectors: [],
      curves: [],
      segments: { start: [], end: [] },
      beginStationNumber: 0,
      endStationNumber: 0,
      startPoint: [],
      slaveOrMaster: true,
      input: { ...inputs },
      points : []
    };
    const spacing = 10000; //단위 수정시 check

    for (let i = 0; i < lineResult.input.horizonDataList.length - 1; i++) {
      lineResult.startPoint.push(global._.take(lineResult.input.horizonDataList[i], 2));
      lineResult.vectors.push(
        Vector2d([
          global._.take(lineResult.input.horizonDataList[i], 2),
          global._.take(lineResult.input.horizonDataList[i + 1], 2)
        ])
      );
    }

    for (let i = 0; i < lineResult.input.horizonDataList.length - 2; i++) {
      lineResult.curves.push(
        Curve(
          global._.take(lineResult.input.horizonDataList[i], 2),
          lineResult.vectors[i],
          lineResult.vectors[i+1],
          lineResult.input.horizonDataList[i + 1][2],
          lineResult.input.horizonDataList[i + 1][3],
          lineResult.input.horizonDataList[i + 1][4],
        )
      );
    }
    const dataList = lineResult.input.horizonDataList;
    let segmentsStation = lineResult.input.beginStation;
    lineResult.segments.start.push(segmentsStation);
    for (let j = 0; j < (dataList.length - 2); j++) {
      if (j === 0){
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
        lineResult.segments.start.push(segmentsStation);
      } else {
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j-1].endOffset;
        lineResult.segments.start.push(segmentsStation);
      }
      segmentsStation += lineResult.curves[j].beginClothoid.length;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation +=  lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation +=  lineResult.curves[j].endClothoid.length;
      lineResult.segments.start.push(segmentsStation);
    }
    lineResult.segments.end.push(...global._.drop(lineResult.segments.start));
    if (lineResult.curves.length === 0){
      segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length;
    }else {
      segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length - lineResult.curves[lineResult.curves.length -1].endOffset;
    }
    lineResult.segments.end.push(segmentsStation);
    lineResult.beginStationNumber = lineResult.segments.start[0];
    lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];

    for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
      lineResult.points.push(PointGenerator(i, lineResult,90));
    }
    return lineResult;
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

  // const startPoint = [0,0]
  // const xy
  // 1 = [[5, 5], [10, 15]]
  // const xydata2 = [[10, 15], [30, 35]]
  // const radius = 100
  // const a1 = 10
  // const a2 = 10
  // const test = Curve(startPoint, xydata1, xydata2, radius, a1, a2)


  const PointGenerator = (stationNumber, line, skew) => {
    let resultPoint = {
      stationNumber:stationNumber.toFixed(4)*1,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: stationNumber,
      offset: 0,
      virtual: false,
      skew : skew,
    };
    const dataList = line.input.horizonDataList;
    const startStationNumList = line.segments.start;
    const endStationNumList = line.segments.end;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = line.startPoint;
    let tempRes = [0,0,0,0
    
    ];
    
    for (let i = 0; i <= 4 * (dataList.length-2); i++) {
      l = stationNumber - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        stationNumber >= startStationNumList[i] &&
        stationNumber <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (i === 0 || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
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

  function VerticalPositionGenerator(VerticalDataList, SuperElevation, Point){
      const station = Point.masterStationNumber;
      const offset = Point.offset;
      let result_elevation = 0;
      let superelevation =0;
      let parabola_data = [];
      let tangent = [];
      let gradX = 0;
    for (let i = 0; i < VerticalDataList.length-1; i++){
        tangent.push( (VerticalDataList[i+1]['elevation'] - VerticalDataList[i]['elevation']) /
        (VerticalDataList[i+1]['station'] - VerticalDataList[i]['station']) );
    }
    for (let i = 0; i <  VerticalDataList.length-2;i++){
      let parabola1 = VerticalDataList[i+1]['station'] - VerticalDataList[i+1]['curveLength'] / 2;
      let parabola2 = VerticalDataList[i+1]['station'] + VerticalDataList[i+1]['curveLength'] / 2;
        parabola_data.push([
          parabola1,
          parabola2,
          VerticalDataList[i]['elevation'] + tangent[i] * ( parabola1 - VerticalDataList[i]['station'] ),
          VerticalDataList[i+1]['elevation'] + tangent[i+1] * (parabola2 - VerticalDataList[i+1]['station']),
          VerticalDataList[i+1]['curveLength']
        ]);

      }
    if (station <= VerticalDataList[0]['station']){
        result_elevation = VerticalDataList[0]["elevation"] + tangent[0] * (station - VerticalDataList[0]['station'] );
        gradX = tangent[0];
    } else if (station >= VerticalDataList[VerticalDataList.length -1]['station']){
        result_elevation = VerticalDataList[VerticalDataList.length-1]['elevation'] + tangent[tangent.length-1] * ( station - VerticalDataList[VerticalDataList.length-1]['station'] );
        gradX = tangent[tangent.length-1];
    }else{
        for (let i = 0; i<VerticalDataList.length-1;i++){
            if (station >= VerticalDataList[i]['station'] && station < VerticalDataList[i+1]['station']){
                result_elevation = VerticalDataList[i]['elevation'] + tangent[i] * (station - VerticalDataList[i]['station'] );
                gradX = tangent[i];
            }
        }
        for (let i = 0; i<VerticalDataList.length-2;i++){
            if (station >= parabola_data[i][0] && station <= parabola_data[i][1]){
                result_elevation = parabola_data[i][2] + 
                tangent[i] * (station - parabola_data[i][0]) + 
                (tangent[i+1] - tangent[i]) / 2 / parabola_data[i][4] * (station - parabola_data[i][0])**2;
                gradX = tangent[i] + (tangent[i+1] - tangent[i])  / parabola_data[i][4] * (station - parabola_data[i][0]);
            }
        }
    }
    let gradient = Gradient(SuperElevation, station, offset);
    superelevation = gradient * offset;
   return {elevation:result_elevation + superelevation,gradientX:gradX, gradientY:gradient}

  }

  function Gradient(SuperElevation,station, offset){
    // const station = Point.masterStationNumber;
    // const offset = Point.offset;
    let gradient = 0;

    if (station <= SuperElevation[0]['station']){
      if (offset < 0){
          gradient = -SuperElevation[0]['left'];
      }else{
          gradient = SuperElevation[0]['right'];
      }
    }else if (station >= SuperElevation[SuperElevation.length -1]['station']){
        if (offset < 0){
            gradient = -SuperElevation[SuperElevation.length-1]['left'] ;
        }else{
            gradient = SuperElevation[SuperElevation.length-1]['right'];
        }
    }else{
        for (let i = 0;i< SuperElevation.length-1;i++){
            if (station >= SuperElevation[i]['station'] && station < SuperElevation[i+1]['station']){
                if (offset < 0){
                    gradient = -( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                    * (SuperElevation[i+1]['left'] - SuperElevation[i]['left']) + SuperElevation[i]['left'] );
                }else{
                    gradient = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                    * (SuperElevation[i+1]['right'] - SuperElevation[i]['right']) + SuperElevation[i]['right'] );
                }
            }
        }
    }
    return gradient / 100
  }

}(global));
