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
    splice: splice$1,
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
    this.setOutputData(2,splice$1);
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
    lineResult.HorizonDataList = horizon;
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

  function OffsetLine(offset, line, startPoint, endPoint){
   
    let points = [];
    let st = 0;
    let ed = 0;
    let offsetPoint = {};
     for (let i = 0; i < line.points.length; i++) {
      //  let zOffset = offset > 0? line.points[i].rightGradient * offset : line.points[i].leftGradient * offset
      offsetPoint = {
        // stationNumber: line.points[i].masterStationNumber,
        x: line.points[i].x + line.points[i].normalCos * offset,
        y: line.points[i].y + line.points[i].normalSin * offset,
        // z: 0, //line.points[i].z +  zOffset,
        normalCos: line.points[i].normalCos,
        normalSin: line.points[i].normalSin,
        // masterStationNumber: line.points[i].masterStationNumber,
        // skew: line.points[i].skew,
        // offset: offset,
        // virtual: false
      };
      st = startPoint.normalSin * (offsetPoint.x - startPoint.x) - startPoint.normalCos * (offsetPoint.y - startPoint.y);
      ed = endPoint.normalSin * (offsetPoint.x - endPoint.x) - endPoint.normalCos * (offsetPoint.y - endPoint.y);
      
      if (st*ed <=0){
        
       points.push(offsetPoint);
      }
    }
    return points
  }

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

  const OffsetPoint = (masterPoint,masterLine,offset) => {
      let resultPoint = {
        x: 0,
        y: 0,
        z: 0,
        normalCos: 0,
        normalSin: 0,
        masterStationNumber: 0,
        gradientX:masterPoint.gradientX,
        gradientY: 0,
        skew:masterPoint.skew,
        offset:offset
      };
      if (masterPoint.skew === 90){
        resultPoint.x =  masterPoint.x + masterPoint.normalCos * offset;
        resultPoint.y = masterPoint.y + masterPoint.normalSin * offset;
        resultPoint.normalCos =  masterPoint.normalCos;
        resultPoint.normalSin = masterPoint.normalSin;
        resultPoint.masterStationNumber = masterPoint.masterStationNumber;
        resultPoint.gradientY = offset>0? masterPoint.rightGradient:masterPoint.leftGradient;
        resultPoint.z = masterPoint.z + resultPoint.gradientY * offset;
      } else {
        let skewRad = (masterPoint.skew-90)*Math.PI/180;
        let cos = Math.cos(skewRad);
        let sin = Math.sin(skewRad);
        let skewCos = masterPoint.normalCos*cos - masterPoint.normalSin*sin;
        let skewSin = masterPoint.normalCos*sin + masterPoint.normalSin*cos;
        let skewC = masterPoint.x * skewSin - masterPoint.y * skewCos;
        let newP = {};
        let x = 0;
        let y=0;
        let delta = 0;
        let dist = 0;
        let ms = masterPoint.masterStationNumber+Math.tan(skewRad)*offset;
        for (let i=0;i<30;i++){
          newP = MasterPointGenerator(ms,masterLine);
          let newCos = newP.normalCos;
          let newSin = newP.normalSin;
          let newC = newP.x * newSin - newP.y * newCos;
          let sign = offset>0?1:-1;
          x = (skewCos*newC - newCos * skewC)/(skewCos *newSin - skewSin * newCos);
          y = (skewSin*newC - newSin * skewC)/(skewCos *newSin - skewSin * newCos);
          dist = Math.sqrt((newP.x - x)**2 + (newP.y - y)**2);
          if (Math.abs(Math.abs(offset) - dist) < 0.1){
            break;
          }else {
            let icos = newCos*skewCos + newSin*skewSin;
            let isin = Math.sqrt(1-icos**2);
            delta = sign*(dist - Math.abs(offset))*isin/icos; //추후 검토가 필요함
            ms += delta;
          }
          
        }
        resultPoint.x =  x;
        resultPoint.y = y;
        resultPoint.normalCos =  newP.normalCos;
        resultPoint.normalSin = newP.normalSin;
        resultPoint.masterStationNumber = newP.masterStationNumber;
        resultPoint.gradientY = offset>0? newP.rightGradient:newP.leftGradient;
        resultPoint.z = newP.z + resultPoint.gradientY * offset;
      }
      return resultPoint
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
    const margin = 12000; // 해당변수로 충분한 거더 간격이 포함되어야 함.

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
    // 시종점 교대사각 자동계산 //
    result.gridKeyPoint["CRS" + 1].skew = OffsetSkewCalculator(result.startPoint, result.startPoint.skew, girderLayoutInput.supportData[1][1], masterLine);
    result.gridKeyPoint["CRS" + (girderLayoutInput.supportData.length - 2)].skew = OffsetSkewCalculator(result.endPoint, result.endPoint.skew, -1 * girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1][1], masterLine);
    // 시종점 교대사각 자동계산 끝 //
    let stp = MasterPointGenerator(result.startPoint.masterStationNumber - margin, masterLine, result.startPoint.skew);
    let edp = MasterPointGenerator(result.endPoint.masterStationNumber + margin, masterLine, result.startPoint.skew);

    for (let j = 0; j < girderLayoutInput.getGirderList.length; j++) {
      let girderBaseLine = girderLayoutInput.getGirderList[j][baseLine] === "MasterLine" ? masterLine : slaveLine[girderLayoutInput.getGirderList[j][baseLine]];
      result.girderLine.push(OffsetLine(girderLayoutInput.getGirderList[j][alignOffset], girderBaseLine, stp, edp));
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
      let skew = k < 4 ? OffsetSkewCalculator(masterPoint, girderLayout.startPoint.skew, offset, masterLine) : OffsetSkewCalculator(masterPoint, girderLayout.endPoint.skew, offset, masterLine);
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
    const off = 2;
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
          if (t > 1 + err || t < -1 - err) {
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

    let newMasterPoint = masterPoint.skew === 90 ? masterPoint : PointLineMatch2(resultPoint, masterLine);

    resultPoint.masterStationNumber = newMasterPoint.masterStationNumber.toFixed(4) * 1;
    resultPoint.stationNumber = resultPoint.masterStationNumber;
    if (newMasterPoint.normalCos * (resultPoint.x - newMasterPoint.x) + newMasterPoint.normalSin * (resultPoint.y - newMasterPoint.y) >= 0) {
      sign = 1;
    }
    else {
      sign = -1;
    }
    resultPoint.offset = sign * Math.sqrt((resultPoint.x - newMasterPoint.x) ** 2 + (resultPoint.y - newMasterPoint.y) ** 2).toFixed(4) * 1;
    if (sign > 0) {
      resultPoint.z = newMasterPoint.z + newMasterPoint.rightGradient * resultPoint.offset;
    } else {
      resultPoint.z = newMasterPoint.z + newMasterPoint.leftGradient * resultPoint.offset;
    }
    resultPoint.gradientX = newMasterPoint.gradientX;
    resultPoint.gradientY = sign > 0 ? newMasterPoint.rightGradient : newMasterPoint.leftGradient;
    // resultPoint.check = check

    return resultPoint
  };

  const splineCoefficient = (point1, point2) => {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    const err = 0.0001;

    let b1 = (y2 - y1) / 2;
    let b2 = (x2 - x1) / 2;
    let a1 = 0.0;
    let a2 = 0.0;
    let df1 = 0.0;
    let df2 = 0.0;


    if (point1.normalSin === 0 && point2.normalSin === 0) {
      a2 = 0;
      b2 = 0;
      a1 = 0;
    }
    if (point1.normalSin === 0 && point2.normalSin !== 0) {
      a2 = b2 / 2;
      df2 = -point2.normalCos / point2.normalSin;
      a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
    }
    if (point1.normalSin !== 0 && point2.normalSin === 0) {
      a2 = - b2 / 2;
      df1 = -point1.normalCos / point1.normalSin;
      a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
    }
    if (point1.normalSin !== 0 && point2.normalSin !== 0) {
      df1 = -point1.normalCos / point1.normalSin;
      df2 = -point2.normalCos / point2.normalSin;
      if (Math.abs(df1 - df2) < err) {
        a1 = 0;
        a2 = 0;
      } else {
        a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1));
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    }



    // if (point1.normalSin === 0) {
    //   if (point2.normalSin === 0) {
    //     // return Math.abs(y2 - y1)
    //   }
    //   else {
    //     df2 = -point2.normalCos / point2.normalSin
    //     a2 = b2 / 2
    //     a1 = (-b1 + df2 * (2 * a2 + b2)) / 2
    //   }
    // } else if (point2.normalSin === 0) {
    //   if (point2.normalSin === 0) {
    //     // return Math.abs(y2 - y1)
    //   } else {
    //     df1 = -point1.normalCos / point1.normalSin
    //     a2 = b2 / -2
    //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
    //   }
    // } else {
    //   df1 = -point1.normalCos / point1.normalSin
    //   df2 = -point2.normalCos / point2.normalSin

    //   if (df1 === df2) {
    //     a1 = 0
    //     a2 = 0
    //   } else {
    //     a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1))
    //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
    //   }
    // }
    const c1 = y2 - a1 - b1;
    const c2 = x2 - a2 - b2;
    return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 }
  };

  function splineProp(point1, point2) {
    const coe = splineCoefficient(point1, point2);
    const w1 = 5 / 9;
    const w2 = 8 / 9;
    const w3 = w1;
    const t1 = -0.77459666924;
    const t2 = 0;
    const t3 = 0.77459666924;
    let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2), 2)) * w1
      + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2), 2)) * w2
      + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2), 2)) * w3;
    let l = Math.sqrt(coe.b2 ** 2 + coe.b1 ** 2);
    let midPoint = { x: coe.c2, y: coe.c1, cos: coe.b2 / l, sin: coe.b1 / l, normalCos: coe.b1 / l, normalSin: -coe.b2 / l, coe: coe };
    return { length: length.toFixed(4) * 1, midPoint }
  }

  function GridStationList(pointDict) {
    let gs = [];
    let cs = [];
    for (let k in pointDict) {
      let girderIndex = k.substr(1, 1) - 1;
      if (gs.length <= girderIndex) {
        for (let i = 0; i <= girderIndex - gs.length; i++) {
          gs.push([]);
        }
      }

      if (k.substr(0, 1) === "G") {
        let s = pointDict[k].masterStationNumber;
        if (s >= pointDict["G" + (girderIndex + 1) + "K1"].masterStationNumber &&
          s <= pointDict["G" + (girderIndex + 1) + "K6"].masterStationNumber) {
          gs[girderIndex].push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] });
        }
      } else {
        cs.push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] });
      }

    }
    gs.forEach(function (elem) { elem.sort(function (a, b) { return a.station < b.station ? -1 : 1; }); });
    cs.sort(function (a, b) { return a.station < b.station ? -1 : 1; });

    return { girder: gs, centerLine: cs }
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
      let skew = Point.skew? Point.skew : 90;
      if (Point.skew !=90){
          skewCot = - 1 / Math.tan(skew * Math.PI/180); 
      }    let X = node2D.x;
      let Y = X * skewCot; 
      let Z = node2D.y;

      newPoint.x = Point.x + X * cos - Y*sin; 
      newPoint.y = Point.y + X * sin + Y*cos;
      newPoint.z = Point.z + Z;
      newPoint.s = Point.masterStationNumber;
      
      return newPoint
  }

  function ToGlobalPoint2(Point, node2D){
    let newPoint = {
        x:0, y:0, z:0
    };
    const cos = Point.normalCos;
    const sin = Point.normalSin;
    // let skewCot = 0;
    // if (Point.skew !=90){
    //     skewCot = - 1 / Math.tan(Point.skew * Math.PI/180) 
    // };
    let X = node2D.x;
    let Y = node2D.y;
    let Z = 0;

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
    }else {
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
    }else {
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
    let plate2 = [ XYOffset(node1,vec,ioffset,pts[2]),
                  XYOffset(node1,vec,ioffset,pts[3]),
                  XYOffset(node1,vec,(length-joffset),pts[3]),
                  XYOffset(node1,vec,(length-joffset),pts[2]),];
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

  function DividingPoint(point1, point2, length){
    //length is distance from point1 to new point in directing point2
    let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2+(point1.z- point2.z)**2);
    return {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y,z:(1-a)*point1.z + a * point2.z}
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

  function ZOffsetLine(points, z) {
    let result = [];
    let vec = [];
    let cos = [];
    let err = 0.001;
    for (let i = 0; i < points.length - 1; i++) {
      let l = Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2 + (points[i].z - points[i + 1].z) ** 2);
      vec.push({ x: (points[i + 1].x - points[i].x) / l, y: (points[i + 1].y - points[i].y) / l, z: (points[i + 1].z - points[i].z) / l });
      cos.push(Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2) / l);
    }
    if (cos[0] == 0) {
      result.push(ZMove(points[0], z));
    } else {
      result.push(ZMove(points[0], z / cos[0]));
    }
    for (let i = 0; i < vec.length - 1; i++) {
      let costheta = -vec[i + 1].x * vec[i].x - vec[i + 1].y * vec[i].y - vec[i + 1].z * vec[i].z;
      if (costheta >= 1 - err || costheta <= -1 + err) {
        if (cos[i] == 0) {
          result.push(ZMove(points[i + 1], z));
        } else {
          result.push(ZMove(points[i + 1], z / cos[i]));
        }
      } else {
        let sinHalftheta = Math.sqrt((1 - costheta) / 2);
        let z2 = sinHalftheta === 0 ? z : z / sinHalftheta;
        let vecSum = { x: (vec[i + 1].x - vec[i].x), y: (vec[i + 1].y - vec[i].y), z: (vec[i + 1].z - vec[i].z) };
        let l2 = Math.sqrt(vecSum.x ** 2 + vecSum.y ** 2 + vecSum.z ** 2);
        result.push({ x: points[i + 1].x + vecSum.x / l2 * z2, y: points[i + 1].y + vecSum.y / l2 * z2, z: points[i + 1].z + vecSum.z / l2 * z2 });
      }
    }
    result.push(ZMove(points[points.length - 1], z / cos[cos.length - 1]));
    return result
  }

  function ZMove(point, z) {
    return { x: point.x, y: point.y, z: point.z + z }
  }

  function SectionPointDict(pointDict, girderBaseInfo, slabInfo, slabLayout) {
    let result = {};
    for (let k in pointDict) {
      if (k.substr(0, 1) === "G") {
        let point = pointDict[k];
        let girderIndex = k.substr(1, 1) - 1;
        let baseInput = {};
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
          let topPlate1 = PlateRestPoint(tl1, tl2, -1 / gradient, -1 / gradient, ps.uFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
          let tr1 = { x: rw2.x + sectionInfo.D, y: rw2.y + gradient * (sectionInfo.D) };
          let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW) };
          let topPlate2 = PlateRestPoint(tr1, tr2, -1 / gradient, -1 / gradient, ps.uFlangeThk);        // newTopPlate
          let uflange = [[],[],[]];
          let newtl1 = { x: lw2.x - ps.uFlangeC, y: lw2.y + gradient * (- ps.uFlangeC) };
          let newtl2 = { x: lw2.x - ps.uFlangeC + ps.uFlangeW, y: lw2.y + gradient * (- ps.uFlangeC + ps.uFlangeW) };
          let newtr1 = { x: rw2.x + ps.uFlangeC, y: rw2.y + gradient * (ps.uFlangeC) };
          let newtr2 = { x: rw2.x + ps.uFlangeC - ps.uFlangeW, y: rw2.y + gradient * (ps.uFlangeC - ps.uFlangeW) };

          if (newtl2.x < newtr2.x ){ //양측의 플렌지가 서로 중첩될 경우
              uflange[0] = PlateRestPoint(newtl1, newtl2, -1 / gradient, -1 / gradient, ps.uFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
              uflange[1] = PlateRestPoint(newtr1, newtr2, -1 / gradient, -1 / gradient, ps.uFlangeThk);        }else {
              uflange[2] = PlateRestPoint(newtl1, newtr1, -1 / gradient, -1 / gradient, ps.uFlangeThk);        }


          baseInput = {
              isDoubleComposite: false, // 추후 PointSectionInfo에 관련 변수 추가
              isClosedTop: tl2.x < tr1.x?true:false,         
              B1: rw1.x - lw1.x ,                                 //강거더 하부 내부폭
              B2: rw2.x - lw2.x ,                                 //강거더 상부 내부폭
              B3: 3500,  //바닥판 콘크리트 폭                      //슬래브에 대한 정보는 외부에서 받아와야 함
              wlw: Point2DLength(lw1, lw2),                       //좌측웹 폭
              wrw: Point2DLength(rw1, rw2),                       //우측웹 폭
              wuf: tl2.x < tr1.x?ps.uFlangeW:tr2.x - tl1.x,       //상부플랜지 폭
              wlf: b2.x - b1.x,                                   //하부플랜지 폭
              H: height -slabThickness,                           //강거더 높이
              tlf: ps.lFlangeThk ,                                //하부플랜지 두께
              tuf: ps.uFlangeThk,                                 //상부플랜지두께
              tw: ps.webThk,                                      //웹두께
              Tcu: ps.slabThickness,                              //바닥판콘크리트 두께          
              Th: slabInfo.haunchHeight ,                                   //헌치두께
              Tcl: 0,                       //지점콘크리트 두께     //지점콘크리트에 대한 입력 변수 추가
              blf: (sectionInfo.C1 + sectionInfo.D1)/2,            //하부플랜지 외부폭
              buf: (sectionInfo.C + sectionInfo.D)/2,             //상부플랜지 외부폭
              Urib: { thickness: ps.uRibThk, height: ps.uRibH, layout: ps.uRibLO },
              Lrib: { thickness: ps.lRibThk, height: ps.lRibH, layout: ps.lRibLO }, 
              horizontal_bracing: { d0: 2500, vbArea: 50, dbArea: 50 }, //수직보강재 간격, 수평브레이싱 수직, 사재 단면적
            };
          if (i === 0) {
            forward = {input : baseInput , skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib , uflange : uflange };
          } else {
            backward = {input : baseInput , skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib, uflange : uflange };
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
          uFlangeC: 0,//플렌지 하나의 폭을 의미함, 0 이거나 전체폭과 값과 같거나 절반보다 크면 폐합단면, 보다 절반보다 작으면 개구단면, 하부플렌지에도 동일하게 적용함
          uFlangeW: 0,//전체폭을 의미함
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
          uFlangeC: 0,
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
                  }else {
                      height = girderBaseInfo.height[i][2];
                  }
              }else if (girderBaseInfo.height[i][4] == "parabola"){
                  if (deltaH>0){
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + deltaH / L**2 * x1**2;
                  }else if (deltaH<0){
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] - deltaH / L**2 * x1**2;
                  }else {
                      height = girderBaseInfo.height[i][2];
                  }
              }else {  //straight
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
          forward.uFlangeC = uFlange[0][5][0] + (uFlange[0][5][1] - uFlange[0][5][0])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
      }
      uFlange = girderBaseInfo.uFlange.filter(function(element){ 
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
          });
      if(uFlange.length>0){
          backward.uFlangeThk = uFlange[0][2];
          backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
          backward.uFlangeC = uFlange[0][5][0] + (uFlange[0][5][1] - uFlange[0][5][0])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
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

  function DeckSectionPoint(
      masterLine,
      centerLineStations,
      girderLayout,
      slabInfo,
      slabLayout,
      girderBaseInfo,
      pointDict,
    ) {
      let result = [];
      // let slab1 = [];
      // let slab2 = [];
      const position = 0;
      const T = 1;
      const H = 2;
      // const leftOffset = 3;
      // const rightOffset = 4;
    
      let centerSlabThickness = slabInfo.slabThickness;
      let haunch = slabInfo.haunchHeight;
      let endT = 0;
      let leftOffset = 0;
      let rightOffset = 0;
      let slabThickness = 0;
      for (let i = 1; i < centerLineStations.length - 1; i++) {
    
        let masterPoint = centerLineStations[i].point;
        let masterStation = masterPoint.masterStationNumber;
        //deckSectionInfo로 분리예정
        for (let i = 0; i < slabLayout.length - 1; i++) {
          let ss = pointDict[slabLayout[i][position]].masterStationNumber;
          let es = pointDict[slabLayout[i + 1][position]].masterStationNumber;
          if (masterStation >= ss && masterStation <= es) {
            let x = masterStation - ss;
            let l = es - ss;
            leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
            rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
            slabThickness = slabLayout[i][H] * (l - x) / l + slabLayout[i + 1][H] * (x) / l;
            endT = slabLayout[i][T] * (l - x) / l + slabLayout[i + 1][T] * (x) / l;
          }
        }
        //deckSectionInfo로 분리예정
        let leftPoint = OffsetPoint(masterPoint, masterLine, leftOffset);
        let rightPoint = OffsetPoint(masterPoint, masterLine, rightOffset);
    
        let slabUpperPoints = [ZMove(leftPoint, centerSlabThickness + haunch),
                              ZMove(masterPoint, centerSlabThickness + haunch),
                              ZMove(rightPoint, centerSlabThickness + haunch),];
        let slabLowerPoints = [];
        slabLowerPoints.push({ x: leftPoint.x, y: leftPoint.y, z: leftPoint.z + centerSlabThickness + haunch - endT });
         let offsetPoint = [leftOffset];

        for (let j in girderLayout.girderLine) {
          // let gridName = "G" + (j * 1 + 1) + slabLayout[i].position.substr(2, 2)
          let girderLine = girderLayout.girderLine[j];
          let girderPoint = LineMatch2(masterPoint, masterLine, girderLine);
          let lw = UflangePoint(girderPoint, pointDict, girderBaseInfo[j], slabInfo, slabLayout);
          //haunch포인트에 대한 내용을 위의함수에 포함하여야 함. 
          //추후 three.js union함수를 통한 바닥판 계산을 하는것은 어떨지 고민중
          lw.forEach(element => slabLowerPoints.push(ToGlobalPoint(girderPoint, element)));
          offsetPoint.push(girderPoint.offset);
        }
        offsetPoint.push(rightOffset);
        slabLowerPoints.push({ x: rightPoint.x, y: rightPoint.y, z: rightPoint.z + centerSlabThickness + haunch - endT });
        result.push({ name: masterStation, slabUpperPoints, slabLowerPoints, offsetPoint });
      
      }
      return result //{ slab1, slab2 }
    }
    //UflangePoint는 상부플랜지 헌치의 하단좌표를 출력하는 함수임
    function UflangePoint(girderPoint, pointDict, girderBaseInfo, slabInfo, slabLayout) {
      let points = [];
      // for (let i in girderBaseInfo){
      let station = girderPoint.masterStationNumber;
      let gradient = girderPoint.gradientY;
      let skew = girderPoint.skew;
      let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict); // slabThickness만 필요한 경우에는 흠...
      let sectionInfo = girderBaseInfo.section;
      let ps = pointSectionInfo.forward.uFlangeW === 0 ? pointSectionInfo.backward : pointSectionInfo.forward;
      let slabThickness = ps.slabThickness - slabInfo.slabThickness;
    
      const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H };
      const lwt = { x: - sectionInfo.UL, y: 0 };
      const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H };
      const rwt = { x: sectionInfo.UR, y: 0 };
      let lw2 = WebPoint(lwb, lwt, gradient, -slabThickness); //{x:tlwX,y:gradient*tlwX - slabThickness}
      let rw2 = WebPoint(rwb, rwt, gradient, -slabThickness); //{x:trwX,y:gradient*trwX - slabThickness}
      // TopPlate
      let tl1 = { x: lw2.x - sectionInfo.C - slabInfo.w1, y: lw2.y + gradient * (- sectionInfo.C - slabInfo.w1) };
      let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW + slabInfo.w1, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW + slabInfo.w1) };
      let tr1 = { x: rw2.x + sectionInfo.D + slabInfo.w1, y: rw2.y + gradient * (sectionInfo.D + slabInfo.w1) };
      let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW - slabInfo.w1, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW - slabInfo.w1) };
      let dummy = [tl1, tl2, tr1, tr2];
      dummy.sort(function (a, b) { return a.x < b.x ? -1 : 1; });
      points.push(...dummy); //이렇게 하면 절대위치에 대한 답을 얻을수가 없음. girderLayout도 호출해야함. 차라리 섹션포인트에서 보간법을 이용해서 좌표를 받아오는 것도 하나의 방법일듯함
      // }
      return points
    }

    function Point2DLength(point1, point2) {
      return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
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


  function DeckPoint(){
      this.addInput("masterLine","line");
      this.addInput("centerLineStation","centerLineStation");
      this.addInput("girderLayout","girderLayout");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("girderBaseInfo","arr");
      this.addInput("pointDict","pointDict");
      this.addOutput("DeckPointDict","DeckPointDict");
    }

    DeckPoint.prototype.onExecute = function(){
      this.setOutputData(0,DeckSectionPoint(
          this.getInputData(0),
          this.getInputData(1),
          this.getInputData(2),
          this.getInputData(3),
          this.getInputData(4),
          this.getInputData(5),
          this.getInputData(6)
        ));
    };

  function FilletPoints(plate1, plate2, isForward, radius, smoothness) {
    let filletPoint = [[], [], [], []];

    let plt1 = isForward ? plate1 : plate2;
    let plt2 = isForward ? plate2 : plate1;
    let result = [[], []];

    for (let ii = 0; ii < 2; ii++) {
      let p1 = new global.THREE.Vector3(plt1[0][ii + 1].x, plt1[0][ii + 1].y, plt1[0][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      filletPoint[ii] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let ii = 0; ii < 2; ii++) {
      let p1 = new global.THREE.Vector3(plt1[1][ii + 1].x, plt1[1][ii + 1].y, plt1[1][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      filletPoint[ii + 2] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let jj = 0; jj < smoothness + 2; jj++) {
      let kk = isForward ? jj : smoothness + 1 - jj;
      result[0].push(plt2[0][0]);
      result[0].push(filletPoint[0][kk]);
      result[0].push(filletPoint[1][kk]);
      result[0].push(plt2[0][3]);
      result[1].push(plt2[1][0]);
      result[1].push(filletPoint[2][kk]);
      result[1].push(filletPoint[3][kk]);
      result[1].push(plt2[1][3]);
    }
    return result
  }

  function plateCompare(plate1, plate2) {
    let result = true;
    let err = 0.1;
    for (let i in plate1) {
      for (let j in plate1[i]) {
        if (plate2[i][j]) {
          if (Math.abs(plate1[i][j].x - plate2[i][j].x) > err ||
            Math.abs(plate1[i][j].y - plate2[i][j].y) > err
          ) {
            result = false; //오류발생, 값이 급격하게 차이나는 경우 입력하는 방법이 있어야함
          }
        } else {
          result = false;
        }
      }
    }
    return result
  }

  function steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, plateKey) {
    // 박스형 거더의 상하부플레이트 개구와 폐합에 대한 필렛을 위해 개발되었으며, 개구->폐합, 폐합->개구에 대해서만 가능하다, 
    // 개구->폐합->개구로 2단계의 경우에는 오류가 발생할 수 있음, 2020.05.25 by drlim

    let result = [[], [], []];
    let filletR = 300;

    let uf0 = sectionPointDict[pk1].backward[plateKey];
    let uf1 = sectionPointDict[pk1].forward[plateKey];
    let uf2 = sectionPointDict[pk2].backward[plateKey];
    let uf3 = sectionPointDict[pk2].forward[plateKey];
    let FisB = plateCompare(uf2, uf3);  //forward is backward?  
    let plate0 = [[], [], []];
    let plate1 = [[], [], []];
    let plate2 = [[], [], []];
    let plate3 = [[], [], []];
    let smoothness = 8;

    for (let k in uf1) {
      uf0[k].forEach(element => plate0[k].push(ToGlobalPoint(point1, element)));
      uf1[k].forEach(element => plate1[k].push(ToGlobalPoint(point1, element)));
      uf2[k].forEach(element => plate2[k].push(ToGlobalPoint(point2, element)));
      uf3[k].forEach(element => plate3[k].push(ToGlobalPoint(point2, element)));
    }
    // outborder 
    if (!FisB) {
      let former1 = uf0[0][0] ? uf0[0][0].x : uf0[2][0].x;
      let latter1 = uf1[0][0] ? uf1[0][0].x : uf1[2][0].x;
      if (former1 < latter1) {
        if (uf1[2][0]) {
          plate1[2][0] = DividingPoint(plate1[2][0], plate2[2][0], (latter1 - former1) * 2);
          plate1[0][1] = DividingPoint(plate1[2][1], plate2[2][1], (latter1 - former1) * 2);
          plate1[0][2] = DividingPoint(plate1[2][2], plate2[2][2], (latter1 - former1) * 2);
          plate1[2][3] = DividingPoint(plate1[2][3], plate2[2][3], (latter1 - former1) * 2);
        }
        for (let k in uf1) {
          plate0[k].forEach(element => result[k].push(element));
        }
      }
    }
    if (uf1[2].length === 0 && uf0[2].length > 0) {  //폐합에서 분할로 시작 // 외측과 내측필렛이 같은요소에 작용하면 오류가 발생할 것으로 예상, 필렛이 없는 폐합요소에만 외측 챔퍼 적용
      let filletPoints = FilletPoints(plate1, plate2, false, filletR, smoothness);
      result[0].push(...filletPoints[0]);
      result[1].push(...filletPoints[1]);
    } else {
      for (let k in uf1) {
        plate1[k].forEach(element => result[k].push(element));
      }
    }
    if (uf2[2].length === 0 && uf3[2].length > 0) {
      let filletPoints = FilletPoints(plate1, plate2, true, filletR, smoothness);
      result[0].push(...filletPoints[0]);
      result[1].push(...filletPoints[1]);
    } else {
      if (pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        for (let k in uf2) {
          plate2[k].forEach(element => result[k].push(element));
        }
      }
    }
    if (!FisB) {
      let former2 = uf2[0][0] ? uf2[0][0].x : uf2[2][0].x;
      let latter2 = uf3[0][0] ? uf3[0][0].x : uf3[2][0].x;
      if (former2 > latter2) {
        if (uf2[2][0]) {
          plate2[2][0] = DividingPoint(plate2[2][0], plate1[2][0], (former2 - latter2) * 2);
          plate2[2][1] = DividingPoint(plate2[2][1], plate1[2][1], (former2 - latter2) * 2);
          plate2[2][2] = DividingPoint(plate2[2][2], plate1[2][2], (former2 - latter2) * 2);
          plate2[2][3] = DividingPoint(plate2[2][3], plate1[2][3], (former2 - latter2) * 2);
          if (!uf3[2][0]) {
            plate3[2][0] = plate3[0][0];
            plate3[2][1] = plate3[1][0];
            plate3[2][2] = plate3[1][3];
            plate3[2][3] = plate3[0][3];
            plate3[0] = [];
            plate3[1] = [];
          }
        }
        for (let k in uf2) {
          plate2[k].forEach(element => result[k].push(element));
        }
        for (let k in uf2) {
          plate3[k].forEach(element => result[k].push(element));
        }
      }
    }
    return result
  }

  function SteelBoxDict2(girderStationList, sectionPointDict) {
    let steelBoxDict = {};
    let pk1 = "";
    let pk2 = "";
    let UFi = 1;
    let Bi = 1;
    let LWi = 1;
    let RWi = 1;
    let Ribi = 1;
    let keyname = "";

    for (let i in girderStationList) {
      for (let j = 0; j < girderStationList[i].length - 1; j++) {

        let point1 = girderStationList[i][j].point;
        let point2 = girderStationList[i][j + 1].point;
        pk1 = girderStationList[i][j].key;
        pk2 = girderStationList[i][j + 1].key;

        let L1 = sectionPointDict[pk1].forward.leftTopPlate;
        let L2 = sectionPointDict[pk2].backward.leftTopPlate;
        let L3 = sectionPointDict[pk2].forward.leftTopPlate;
        let R1 = sectionPointDict[pk1].forward.rightTopPlate;
        let R2 = sectionPointDict[pk2].backward.rightTopPlate;
        let R3 = sectionPointDict[pk2].forward.rightTopPlate;
        let FisB = true;  //forward is backward?  

        keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        let uflangePoint = steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "uflange");
        for (let k in uflangePoint) {
          uflangePoint[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
        splice.forEach(function(sp){ if (pk2.substr(2, 2) === sp){UFi += 1; return}});
        // pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") { UFi += 1 }




        keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        L1 = sectionPointDict[pk1].forward.bottomPlate;
        L2 = sectionPointDict[pk2].backward.bottomPlate;
        L3 = sectionPointDict[pk2].forward.bottomPlate;
        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
        FisB = true;
        for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false; } }
        if (!FisB || pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
          L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
        }
        if (pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP") { Bi += 1; }






        keyname = "G" + (i * 1 + 1).toString() + "LeftWeB" + LWi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        L1 = sectionPointDict[pk1].forward.lWeb;
        L2 = sectionPointDict[pk2].backward.lWeb;
        L3 = sectionPointDict[pk2].forward.lWeb;
        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
        FisB = true;
        for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false; } }
        if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
          L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
        }
        if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { LWi += 1; }

        keyname = "G" + (i * 1 + 1).toString() + "RightWeB" + RWi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        L1 = sectionPointDict[pk1].forward.rWeb;
        L2 = sectionPointDict[pk2].backward.rWeb;
        L3 = sectionPointDict[pk2].forward.rWeb;
        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
        FisB = true;
        for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false; } }
        if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
          L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
        }
        if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { RWi += 1; }

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


  function fillet3D(point1, point2, point3, radius, smoothness) {
    let newPoints = [];
    let v1 = new global.THREE.Vector3();
    let v2 = new global.THREE.Vector3();
    let v3 = new global.THREE.Vector3();
    let vc1 = new global.THREE.Vector3();
    let vc2 = new global.THREE.Vector3();
    let center = new global.THREE.Vector3();
    let ang;
    let l1;

    //console.log(points[i].x);
    v1.subVectors(point1, point2).normalize();
    v2.subVectors(point3, point2).normalize();
    ang = Math.acos(v1.dot(v2));
    l1 = radius / Math.sin(ang / 2);
    v3.addVectors(v1, v2).setLength(l1);
    center.addVectors(point2, v3);
    let p1 = new global.THREE.Vector3().addVectors(point2, v1.multiplyScalar(radius / Math.tan(ang / 2)));
    let p2 = new global.THREE.Vector3().addVectors(point2, v2.multiplyScalar(radius / Math.tan(ang / 2)));
    vc1.subVectors(p1, center);
    vc2.subVectors(p2, center);

    newPoints.push(p1);
    for (let j = 0; j < smoothness; j++) {
      let dirVec = new global.THREE.Vector3().addVectors(vc1.clone().multiplyScalar(smoothness - j), vc2.clone().multiplyScalar(j + 1)).setLength(radius);
      newPoints.push(new global.THREE.Vector3().addVectors(center, dirVec));
    }
    newPoints.push(p2);
    //let line2 = new THREE.Line(newGeometry,line.material);
    //scene.add(line2)
    return newPoints;
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

  // Cy, Cz 0: left, bottom 1: center, 2: right, top
  function PTS(name, Yinverse, Cy, sectionDB) {
      let pts = [0, 0, 0, 0, 0, 0];
      let base = 0;
      switch (Cy) {
          case 0:
              base = Yinverse ? sectionDB[name].shape[1] : 0;
              break;
          case 1:
              base = Yinverse ? sectionDB[name].Cy : -sectionDB[name].Cy;
              break;
          case 2:
              base = Yinverse ? 0 : - sectionDB[name].shape[1];
              break;
          default:
              base = 0;
      }
      let sign = Yinverse ? 1 : -1;
      if (sectionDB[name].type === "L") {
          pts[0] = base;
          pts[1] = base - sign * sectionDB[name].shape[2];
          pts[2] = pts[1];
          pts[3] = base - sign * sectionDB[name].shape[1];
          pts[4] = sectionDB[name].shape[0];
          pts[5] = sectionDB[name].shape[3];
      } else if (sectionDB[name].type === "T") {
          pts[0] = base - sign * sectionDB[name].shape[1];
          pts[1] = base;
          pts[2] = base - sign * sectionDB[name].Cy - sign * sectionDB[name].shape[2]/2;
          pts[3] = base - sign * sectionDB[name].Cy + sign * sectionDB[name].shape[2]/2;
          pts[4] = -sectionDB[name].shape[3];
          pts[5] = -sectionDB[name].shape[0];
      }
      // 각 형강에 대한 결과 순서가 통일성이 없음 추후 수정 바람 20.03.25 by drlim
      return pts
  }

  function DiaShapeDict(
    gridPoint,
    sectionPointDict,
    diaphragmLayout,
    diaphragmSectionList,
    sectionDB
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
          diaSection,
          sectionDB
        );
      } else if (diaphragmLayout[i][section] == "diaType2") {
        result[gridkey] = diaphragmSection2(
          webPoints,
          skew,
          uflangePoints,
          diaSection
        );
      }
      result[gridkey].point = gridPoint[gridkey];
    }
    
    return result;
  }

  function VstiffShapeDict(
    gridPoint,
    sectionPointDict,
    vStiffLayout,
    vStiffSectionList,
    sectionDB
  ) {
    const position = 0;
    const section = 1 ;
    let result = {};
    for (let i = 0; i < vStiffLayout.length; i++) {
      let gridkey = vStiffLayout[i][position];
      let vSection = vStiffSectionList[vStiffLayout[i][section]];
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
      result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection,sectionDB);
      result[gridkey].point = gridPoint[gridkey];
    }
    
    return result;
  }

  function HBracingDict(
      pointDict,
      sectionPointDict,
      hBracingLayout,
      hBracingectionList,
      sectionDB
    ) {
      const from = 0;
      const to = 1;
      const leftToright = 2;
      const section = 3;
      const platelayout = 4;
      let hBracingDict = {};
      let hBracingPlateDict = {};
      let right = true;
      for (let i = 0; i < hBracingLayout.length; i++) {
        let hBSection = hBracingectionList[hBracingLayout[i][section]];
        let pk1 = hBracingLayout[i][from];
        let pk2 = hBracingLayout[i][to];
        let webPoints = [];
        if (hBracingLayout[i][leftToright]) {
          webPoints = [
            sectionPointDict[pk1].forward.lWeb[0],
            sectionPointDict[pk1].forward.lWeb[1],
            sectionPointDict[pk2].forward.rWeb[0],
            sectionPointDict[pk2].forward.rWeb[1]
          ];
        } else {
          webPoints = [
            sectionPointDict[pk1].forward.rWeb[0],
            sectionPointDict[pk1].forward.rWeb[1],
            sectionPointDict[pk2].forward.lWeb[0],
            sectionPointDict[pk2].forward.lWeb[1]
          ];
        }
        let point1 = pointDict[pk1];
        let point2 = pointDict[pk2];
    
        hBracingDict[pk1 + pk2] = hBracingSection(point1, point2, webPoints, hBSection,sectionDB);
        if (hBracingLayout[i][platelayout][0]) {
          right = hBracingLayout[i][leftToright] ? false : true;
          let webPoints1 = [
            sectionPointDict[pk1].forward.lWeb[0],
            sectionPointDict[pk1].forward.lWeb[1],
            sectionPointDict[pk1].forward.rWeb[0],
            sectionPointDict[pk1].forward.rWeb[1]
          ];
          hBracingPlateDict[pk1] = hBracingPlate(point1, right, webPoints1, hBSection);
        }
        if (hBracingLayout[i][platelayout][1]) {
          right = hBracingLayout[i][leftToright] ? true : false;
          let webPoints2 = [
            sectionPointDict[pk2].forward.lWeb[0],
            sectionPointDict[pk2].forward.lWeb[1],
            sectionPointDict[pk2].forward.rWeb[0],
            sectionPointDict[pk2].forward.rWeb[1]
          ];
          hBracingPlateDict[pk2] = hBracingPlate(point2, right, webPoints2, hBSection);
        }
      }
    
      return { hBracingDict, hBracingPlateDict };
    }

  function diaphragmSection(webPoints, skew, uflangePoint, ds, sectionDB){ //ribPoint needed
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
      let pts = PTS(ds.dFrameName,false,1,sectionDB);
      let newleftline = [
        {x:leftline[0].x - (ds.spc - lcos * pts[3]) / ltan, y: leftline[0].y - (ds.spc - lcos * pts[3])},
        {x:leftline[1].x + (ds.spc - lsin * pts[3]), y: leftline[1].y + ltan * (ds.spc - lsin * pts[3])}
      ];
      let [leftframe1,leftframe2] = Kframe(newleftline[1],newleftline[0],0,0,pts);
      result["leftframe1"] = {points:leftframe1, Thickness:pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]};
      result["leftframe2"] = {points:leftframe2, Thickness:pts[5],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
        size:{Label:"L-100x100x10x"+PointLength(...newleftline).toFixed(0)},
        anchor:[[newleftline[1].x-20,newleftline[1].y],[newleftline[0].x-20,newleftline[0].y]]};
      
      let rightline = [{x:ds.spc*gsin,y:ds.spc*gcos},lowerTopPoints[2]];
      let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2);
      let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x);
      let rsin = rcos * rtan;
      let newrightline = [
        {x:rightline[0].x - (ds.spc + rcos * pts[3]) / rtan, y: rightline[0].y - (ds.spc + rcos * pts[3])},
        {x:rightline[1].x - (ds.spc - rsin * pts[3]), y: rightline[1].y - rtan * (ds.spc - rsin * pts[3])}
      ];
      let [rightframe1,rightframe2] = Kframe(newrightline[0],newrightline[1],0,0,pts);
      result["rightframe1"] = {points:rightframe1, Thickness:pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]};
      result["rightframe2"] = {points:rightframe2, Thickness:pts[5],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
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

    function vStiffSection(webPoints, skew, uflangePoint, vSection, sectionDB){

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
      let pts = PTS(vSection.tFrameName,false,0,sectionDB);
      // let pts = vSection.pts;
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
      upperframe1:{points:upperframe1, Thickness:pts[4],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
      upperframe2:{points:upperframe2, Thickness:pts[5],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
     }
  }


  function hBracingSection(point1, point2, webPoints, hBSection, sectionDB){
    // let sideToplength = 700;
    // let sideTopwidth = 300;
    // let B = 2000;
    // let H = 2500;
    // let ULR = 1300;

    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];

    const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
    const rwCot = (tr.x - br.x)/(tr.y-br.y);

    let upperHeight = hBSection.upperHeight;
    let sideTopThickness = hBSection.sideTopThickness;
    let spc = hBSection.spc;
    let pts = PTS(hBSection.dFrameName,false,1,sectionDB); //hBSection.pts

    let node1 = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y: tl.y -(upperHeight + sideTopThickness)};
    let node2 = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y: tr.y -(upperHeight + sideTopThickness)};
    let Brline = [
      ToGlobalPoint(point1, node1),
      ToGlobalPoint(point2, node2)
    ];
    let Vector = [Brline[1].x - Brline[0].x, 
                  Brline[1].y - Brline[0].y, 
                  Brline[1].z - Brline[0].z];
    let VectorLength = Math.sqrt(Vector[0]**2 + Vector[1]**2 + Vector[2]**2);
    let normalCos = Vector[1] / VectorLength;
    let normalSin = - Vector[0] / VectorLength;
    let newBrLine = [{x: Brline[0].x + Vector[0] * spc / VectorLength,
                      y: Brline[0].y + Vector[1] * spc / VectorLength,
                      z: Brline[0].z + Vector[2] * spc / VectorLength},
                      {x: Brline[1].x - Vector[0] * spc / VectorLength,
                        y: Brline[1].y - Vector[1] * spc / VectorLength,
                        z: Brline[1].z - Vector[2] * spc / VectorLength}];
    let pointslist = 
      [{x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z},
      {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z},
      {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z + pts[4]},
      {x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z + pts[4]},
      {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z},
      {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z},    
      {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z + pts[4]},
      {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z + pts[4]},
    ];
    let pointslist2 =
    [
      {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z},
      {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z},
      {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z + pts[5]},
      {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z + pts[5]},
      {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z},
      {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z},
      {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z + pts[5]},
      {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z + pts[5]},
      ];
    
    return { line:Brline, points:[pointslist, pointslist2,[]]};
  }

  function hBracingPlate(point, right, webPoints, hBSection){
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
    const rwCot = (tr.x - br.x)/(tr.y-br.y);

    let upperHeight = hBSection.upperHeight;
    let sideTopThickness = hBSection.sideTopThickness;
    let sideToplength = hBSection. sideToplength;
    let sideTopwidth = hBSection. sideTopwidth;
    let scallopHeight = hBSection. scallopHeight;
    let scallopRadius = hBSection. scallopRadius;
    let scallopBottom = hBSection. scallopBottom;
     
    let position = {};
    let rotationY = Math.atan((tr.y - tl.y)/(tr.x-tl.x));
    if (right){
      position = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)};
      rotationY = -rotationY;
    }else {
      position = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)}; 
    }
    let rotation = (right)? Math.PI/2 : -Math.PI/2;
    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);
    let curve = new global.THREE.ArcCurve(0,scallopHeight,scallopRadius,Math.PI,0,true);
    let curvePoint = curve.getPoints(8);
    let ps = [];
    ps.push({x:-sideToplength/2, y:sideTopwidth});
    ps.push({x:-sideToplength/2, y: 0});
    ps.push({x:-scallopBottom, y:0});
    
    for (let i=0; i < 9;i++){
      ps.push({x:curvePoint[i].x,y:curvePoint[i].y});  
    }  ps.push({x:scallopBottom, y:0});
    ps.push({x:sideToplength/2, y:0});
    ps.push({x:sideToplength/2, y:sideTopwidth});
    let plateShape = [];
    for (let i=0; i<ps.length;i++){
      plateShape.push({x:position.x + ps[i].x *cos - ps[i].y*sin, y: ps[i].y*cos + ps[i].x*sin});
    }

    return {point:point, plate: {points:plateShape,Thickness: sideTopThickness,z:position.y, rotationX:0, rotationY:rotationY,hole:[]}}
  }

  // import { LiteGraph, meshArr } from "global";


  function DiaDict(){
      this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("diaphragmLayout","arr");
    this.addInput("diaphragmSectionList","diaphragmSectionList");
    this.addInput("sectionDB","sectionDB");
    this.addOutput("diaDict","diaDict");
  }

  DiaDict.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
    const diaphragmLayout = this.getInputData(2);
    const diaphragmSectionList = this.getInputData(3);

    const result = DiaShapeDict(gridPoint, sectionPointDict,diaphragmLayout,diaphragmSectionList, this.getInputData(4));
    this.setOutputData(0, result);
  };

  function VstiffDict(){
      this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("vStiffLayout","arr");
    this.addInput("vStiffSectionList","vStiffSectionList");
    this.addInput("sectionDB","sectionDB");
    this.addOutput("diaDict","diaDict");
  }

  VstiffDict.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
    const vStiffLayout = this.getInputData(2);
    const vStiffSectionList = this.getInputData(3);
    const result = VstiffShapeDict(gridPoint, sectionPointDict,vStiffLayout,vStiffSectionList, this.getInputData(4));
    this.setOutputData(0, result);
  };

  function HBracing(){
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("hBracingLayout","arr");
      this.addInput("hBracingSectionList","hBracingSectionList");
      this.addInput("sectionDB","sectionDB");
      this.addOutput("hBracingDict","hBracingDict");
    }
    
    HBracing.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
      const hBracingLayout = this.getInputData(2);
      const hBracingSectionList = this.getInputData(3);
      const result = HBracingDict(gridPoint, sectionPointDict,hBracingLayout,hBracingSectionList,this.getInputData(4));
      this.setOutputData(0, result);
    };

  function XbeamDict(
      nameToPointDict,
      sectionPointDict,
      xbeamLayout,
      xbeamSectionList,
      sectionDB
    ) {
        const iNode = 0;
        const jNode =1;
        const section =2;

      let xbeamSectionDict = {};
      let xbeamData = [];
      for (let i = 0; i < xbeamLayout.length; i++) {
        let iNodekey = xbeamLayout[i][iNode];
        let jNodekey = xbeamLayout[i][jNode];
        let xbeamSection = xbeamSectionList[xbeamLayout[i][section]];
        let iSectionPoint = sectionPointDict[iNodekey].forward;
        let jSectionPoint = sectionPointDict[jNodekey].forward;
        let iPoint = nameToPointDict[iNodekey];
        let jPoint = nameToPointDict[jNodekey];
        let xbData = [];
        let xbSection = [];
        // let cbkey = 'CB' + iNodekey + 'To' + jNodekey
        if (xbeamLayout[i][section] == "xbeamI") {
           let xbeam = XbeamSection(
            iPoint,
            jPoint,
            iSectionPoint,
            jSectionPoint,
            xbeamSection
          );
          xbeamSectionDict[iNodekey] = xbeam.result;
          xbData = xbeam.data;
          xbSection = xbeam.section;
        } else if (xbeamLayout[i][section] == "xbeamK") {
            let xbeam  = XbeamSectionK(
            iPoint,
            jPoint,
            iSectionPoint,
            jSectionPoint,
            xbeamSection,
            sectionDB
          );
          xbeamSectionDict[iNodekey] = xbeam.result;
          xbData = xbeam.data;
          xbSection = xbeam.section;
        }
        // xbeamSectionDict[iNodekey] = XbeamSection(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamSection)
        // xbeamPointDict[cbkey] = XbeamPoint(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout)
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
      let key = i<10? "X0" + i: "X"+i;
      let isKframe = xbeamLayout[i][section] == "xbeamK"? true: false;
      xbeamData.push({
            inode : iNodekey, jnode : jNodekey, key : key, isKframe:isKframe, data:xbData, section : xbSection
        });
      }
      
      return {xbeamSectionDict, xbeamData};
    }

  function XbeamSection(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
      const result = {};
      let data = [];
      const connectorLength = xbeamSection.connectorLength;
      const connectorWidth = xbeamSection.connectorWidth;
      const upperFlangeThickness = xbeamSection.upperFlangeThickness;
      const upperFlangeWidth = xbeamSection.upperFlangeWidth;
      const lowerFlangeThickness = xbeamSection.lowerFlangeThickness;
      const lowerFlangeWidth = xbeamSection.lowerFlangeWidth;
      const vStiffThickness = xbeamSection.vStiffThickness;
      const vStiffBottomOffset = xbeamSection.vStiffBottomOffset;
      const vStiffWidth = xbeamSection.vStiffWidth;
      const webThickness = xbeamSection.webThickness;
      const vStiffendFillet = xbeamSection.vStiffendFillet;
      const scallopRadius = xbeamSection.scallopRadius;
    
      const cosec = Math.abs(1 / Math.sin(iPoint.skew * Math.PI / 180));
      const cot = Math.abs(1 / Math.tan(iPoint.skew * Math.PI / 180));
    
      // 기준점은 iTopNode라고 가정, 가로보는 반드시 skew각도와 일치해야함.
      let iNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0]);
      let jNode = ToGlobalPoint(jPoint, jSectionPoint.leftTopPlate[0]);
      let length = Math.sqrt((jNode.x - iNode.x) ** 2 + (jNode.y - iNode.y) ** 2);
      let vec = { x: (jNode.x - iNode.x) / length, y: (jNode.y - iNode.y) / length };
      let grd = (jNode.z - iNode.z) / length;
      let grdSec = Math.sqrt(1 + grd ** 2);
      let centerPoint = {
        x: (iNode.x + jNode.x) / 2,
        y: (iNode.y + jNode.y) / 2,
        z: (iNode.z + jNode.z) / 2,
        normalCos: vec.x,
        normalSin: vec.y,
      };
      let lFlangeL = (iSectionPoint.rWeb[2].x - iSectionPoint.rightTopPlate[0].x) * cosec;
      let rFlangeL = (jSectionPoint.lWeb[2].x - jSectionPoint.leftTopPlate[0].x) * cosec;
    
      let iBottom = ToGlobalPoint(iPoint, iSectionPoint.bottomPlate[1]);
      let jBottom = ToGlobalPoint(jPoint, jSectionPoint.bottomPlate[0]);
      let lengthB = Math.sqrt((jBottom.x - iBottom.x) ** 2 + (jBottom.y - iBottom.y) ** 2);
      let vecB = { x: (jBottom.x - iBottom.x) / lengthB, y: (jBottom.y - iBottom.y) / lengthB };
      let grdB = (jBottom.z - iBottom.z) / lengthB;
      let grdSecB = Math.sqrt(1 + grdB ** 2);
      let bottomPoint = {
        x: (iBottom.x + jBottom.x) / 2,
        y: (iBottom.y + jBottom.y) / 2,
        z: (iBottom.z + jBottom.z) / 2,
        normalCos: vecB.x,
        normalSin: vecB.y,
      };
      let lFlangeB = (iSectionPoint.rWeb[3].x - iSectionPoint.bottomPlate[1].x) * cosec;
      let rFlangeB = (jSectionPoint.lWeb[3].x - jSectionPoint.bottomPlate[0].x) * cosec;
      let gradientX = (iPoint.gradientX + jPoint.gradientX) / 2;
      let vStiffLength = centerPoint.z - bottomPoint.z - vStiffBottomOffset;
      let vStiffPlate = [{ x: webThickness / 2, y: -webThickness / 2 * gradientX },
      { x: webThickness / 2, y: -vStiffLength - webThickness / 2 * gradientX },
      { x: webThickness / 2 + vStiffWidth, y: -vStiffLength - webThickness / 2 * gradientX },
      { x: webThickness / 2 + vStiffWidth, y: -(webThickness / 2 + vStiffWidth) * gradientX }];
      let vStiffTopFillet = Math.max(vStiffWidth - (upperFlangeWidth - webThickness) / 2, 0);
      let vStiffPoint = [];
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1], vStiffPlate[0], vStiffPlate[3], scallopRadius, 4));
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0], vStiffPlate[3], vStiffPlate[2], vStiffTopFillet, 1));
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3], vStiffPlate[2], vStiffPlate[1], vStiffendFillet, 1));
      vStiffPoint.push(vStiffPlate[1]);
      result['vStiffner'] = {
        points: vStiffPoint,
        Thickness: vStiffThickness,
        z: -vStiffThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: Math.PI / 2 * 3,
        hole: [],
        point: centerPoint
      };
    
      result['cbUpperFlange'] = {
        points: [{ x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: upperFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: upperFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: -upperFlangeWidth / 2 },],
        Thickness: upperFlangeThickness,
        z: 0,
        rotationX: Math.atan(gradientX),
        rotationY: -Math.atan(grd),
        hole: [],
        point: centerPoint
      };
      result['connectorLeftTop'] = {
        points: [{ x: (- length / 2 - connectorWidth / 2 * cot) * grdSec, y: connectorWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: upperFlangeWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
        { x: (- length / 2 + connectorWidth / 2 * cot) * grdSec, y: -connectorWidth / 2 }],
    
        Thickness: upperFlangeThickness,
        z: 0,
        rotationX: Math.atan(gradientX),
        rotationY: -Math.atan(grd),
        hole: [],
        point: centerPoint
      };
      result['connectorRightTop'] = {
        points: [{ x: (length / 2 - connectorWidth / 2 * cot) * grdSec, y: connectorWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: upperFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
        { x: (length / 2 + connectorWidth / 2 * cot) * grdSec, y: -connectorWidth / 2 }],
        Thickness: upperFlangeThickness,
        z: 0,
        rotationX: Math.atan((iPoint.gradientX + jPoint.gradientX) / 2),
        rotationY: -Math.atan(grd),
        hole: [],
        point: centerPoint
      };
    
      result['cblowerFlange'] = {
        points: [{ x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },],
        Thickness: lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY: -Math.atan(grdB),
        hole: [],
        point: bottomPoint
      };
      result['connectorLeftBottom'] = {
        points: [{ x: (- lengthB / 2 - connectorWidth / 2 * cot) * grdSecB, y: connectorWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
        { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
        { x: (- lengthB / 2 + connectorWidth / 2 * cot) * grdSecB, y: -connectorWidth / 2 }],
        Thickness: lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY: -Math.atan(grdB),
        hole: [],
        point: bottomPoint
      };
      result['connectorRightBottom'] = {
        points: [{ x: (lengthB / 2 - connectorWidth / 2 * cot) * grdSecB, y: connectorWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
        { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
        { x: (lengthB / 2 + connectorWidth / 2 * cot) * grdSecB, y: -connectorWidth / 2 }],
        Thickness: lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY: -Math.atan(grdB),
        hole: [],
        point: bottomPoint
      };
    
      let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[2]);
      let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[2]);
      let cblength = Math.sqrt((jTopNode.x - iTopNode.x) ** 2 + (jTopNode.y - iTopNode.y) ** 2);
      let cbVec = { x: (jTopNode.x - iTopNode.x) / cblength, y: (jTopNode.y - iTopNode.y) / cblength };
      let gradient = (jTopNode.z - iTopNode.z) / cblength;
      let iCos = (iPoint.normalCos * cbVec.x + iPoint.normalSin * cbVec.y).toFixed(6) * 1;
      let jCos = jPoint.normalCos * cbVec.x + jPoint.normalSin * cbVec.y;
    
      let ibaseNode = { x: iSectionPoint.rWeb[2].x * cosec, y: iSectionPoint.rWeb[2].y };
      let iTopNode1 = { x: iSectionPoint.rightTopPlate[0].x * cosec, y: iSectionPoint.rightTopPlate[0].y };
      let jbaseNode = { x: ibaseNode.x + cblength, y: ibaseNode.y + jTopNode.z - iTopNode.z };
      let jTopNode1 = { x: jbaseNode.x + (jSectionPoint.leftTopPlate[0].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.leftTopPlate[0].y - jSectionPoint.lWeb[2].y };
    
    
      let jBottomNode = { x: jbaseNode.x + (jSectionPoint.lWeb[3].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.lWeb[3].y - jSectionPoint.lWeb[2].y };
      let jBottomNode1 = { x: jbaseNode.x + (jSectionPoint.bottomPlate[0].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.bottomPlate[0].y - jSectionPoint.lWeb[2].y };
      let iBottomNode1 = { x: iSectionPoint.bottomPlate[1].x * cosec, y: iSectionPoint.bottomPlate[1].y };
      let iBottomNode = { x: iSectionPoint.rWeb[3].x * cosec, y: iSectionPoint.rWeb[3].y };
    
      let a = (jBottomNode1.y - iBottomNode1.y) / (jBottomNode1.x - iBottomNode1.x);
    
      let iTopNode2 = { x: ibaseNode.x + connectorLength, y: ibaseNode.y + connectorLength * gradient };
      let iBottomNode2 = { x: iTopNode2.x, y: iBottomNode1.y + a * (iTopNode2.x - iBottomNode1.x) };
      let jTopNode2 = { x: jbaseNode.x - connectorLength, y: jbaseNode.y - connectorLength * gradient };
      let jBottomNode2 = { x: jTopNode2.x, y: iBottomNode1.y + a * (jTopNode2.x - iBottomNode1.x) };
    
      let leftConnectorWeb = [
        ibaseNode,
        iTopNode1,
        iTopNode2,
        iBottomNode2,
        iBottomNode1,
        iBottomNode,
      ];
      result['leftConnectorWeb'] = {
        points: leftConnectorWeb,
        Thickness: xbeamSection.webThickness,
        z: -xbeamSection.webThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: Math.acos(iCos),
        hole: [],
        point: iPoint
      };
      let rightConnectorWeb = [
        jbaseNode,
        jTopNode1,
        jTopNode2,
        jBottomNode2,
        jBottomNode1,
        jBottomNode,
      ];
      result['rightConnectorWeb'] = {
        points: rightConnectorWeb,
        Thickness: xbeamSection.webThickness,
        z: -xbeamSection.webThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: Math.acos(iCos),
        hole: [],
        point: iPoint
      };
      let cbWeb = [
        iTopNode2,
        iBottomNode2,
        jBottomNode2,
        jTopNode2
      ];
      result['cbWeb'] = {
        points: cbWeb,
        Thickness: xbeamSection.webThickness,
        z: -xbeamSection.webThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: Math.acos(iCos),
        hole: [],
        point: iPoint
      };
      // console.log('icos:', iCos) 
      let tlength = Math.sqrt((iPoint.x - jPoint.x)**2 + (iPoint.y - jPoint.y)**2);
      data = [cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
      let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2;
      let section = [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ];
      return {result, data, section}
    }
    
    function XbeamSectionK(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection, sectionDB) {
      const result = {};
      let data = [];
      //K형가로보는 skew를 허용하지 않고 생성됨.
      const topOffset = xbeamSection.topOffset;
      const bottomOffset = xbeamSection.bottomOffset;
      const gussetThickness = xbeamSection.gussetThickness;
      const gussetBondingLength = xbeamSection.gussetBondingLength;
      const gussetWeldingOffset = xbeamSection.gussetWeldingOffset;
      const gussetTopWidth = xbeamSection.gussetTopWidth;
      const gussetBottomWidth = xbeamSection.gussetBottomWidth;
      const gussetCenterWidth = xbeamSection.gussetCenterWidth;
      let hFrameEndOffset = xbeamSection.hFrameEndOffset;
      let diaFrameEndOffset = xbeamSection.diaFrameEndOffset;
      let tFrame = xbeamSection.tFrameName;
      let bFrame = xbeamSection.bFrameName;
      let dFrame = xbeamSection.dFrameName;
      const pts1 = PTS(tFrame,true,1,sectionDB); 
      const pts2 = PTS(bFrame,true,1,sectionDB); 
      const pts3 = PTS(dFrame,true,1,sectionDB); 

    
      let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1]);
      let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[1]);
    
      let length = Math.sqrt((jTopNode.x - iTopNode.x) ** 2 + (jTopNode.y - iTopNode.y) ** 2);
      let xlength = Math.abs(jTopNode.x - iTopNode.x);
      let vec = { x: (jTopNode.x - iTopNode.x) / length, y: (jTopNode.y - iTopNode.y) / length };
      let grd = (jTopNode.z - iTopNode.z) / length;
    
      let centerPoint = {
        x: (iTopNode.x + jTopNode.x) / 2,
        y: (iTopNode.y + jTopNode.y) / 2,
        z: (iTopNode.z + jTopNode.z) / 2,
        normalCos: vec.x,
        normalSin: vec.y,
      };
    
      const iCot = (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x) / (iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y);
      const jCot = (jSectionPoint.lWeb[1].x - jSectionPoint.lWeb[0].x) / (jSectionPoint.lWeb[1].y - jSectionPoint.lWeb[0].y);
      let iheight = iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y;
      let jheight = jSectionPoint.rWeb[1].y - jSectionPoint.rWeb[0].y;
      let points = [
        { x: -xlength / 2 - topOffset * iCot, y: -xlength / 2 * grd - topOffset },
        { x: xlength / 2 - topOffset * jCot, y: xlength / 2 * grd - topOffset },
        { x: xlength / 2 - (jheight - bottomOffset) * jCot, y: xlength / 2 * grd - (jheight - bottomOffset) },
        { x: -xlength / 2 - (iheight - bottomOffset) * iCot, y: -xlength / 2 * grd - (iheight - bottomOffset) },
      ];
      let bottomCenter = { x: (points[2].x + points[3].x) / 2, y: (points[2].y + points[3].y) / 2 };
      let topFrame = Kframe(points[0], points[1], hFrameEndOffset, hFrameEndOffset, pts1);
      let bottomFrame = Kframe(points[3], points[2], hFrameEndOffset, hFrameEndOffset, pts2);
      let leftFrame = Kframe(points[0], bottomCenter, diaFrameEndOffset, diaFrameEndOffset, pts3);
      let rightFrame = Kframe(bottomCenter, points[1], diaFrameEndOffset, diaFrameEndOffset, pts3);
    
      let topVec = Vector(points[0], points[1]);
      let leftVec = Vector(points[0], bottomCenter);
      let rightVec = Vector(bottomCenter, points[1]);
      let bottomVec = Vector(points[3], points[2]);
    
      let leftTopGussetPlate = [
        { x: -xlength / 2 - gussetWeldingOffset * iCot, y: -xlength / 2 * grd - gussetWeldingOffset },
        XYOffset(points[0], topVec, hFrameEndOffset + gussetBondingLength, pts1[0] + gussetWeldingOffset),
        XYOffset(points[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[0] + gussetWeldingOffset),
        XYOffset(points[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[3] - gussetWeldingOffset),
        { x: -xlength / 2 - (gussetWeldingOffset + gussetTopWidth) * iCot, y: -xlength / 2 * grd - (gussetWeldingOffset + gussetTopWidth) },
      ];
      result['centerGusset'] = {
        points: [
          XYOffset(bottomCenter, bottomVec, -gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
          XYOffset(bottomCenter, bottomVec, gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
          XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
          XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
          XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
          XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
        ],
        Thickness: gussetThickness,
        z: -gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['leftTopGusset'] = {
        points: leftTopGussetPlate,
        Thickness: gussetThickness,
        z: -gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['rightTopGusset'] = {
        points: [
          { x: xlength / 2 - gussetWeldingOffset * jCot, y: xlength / 2 * grd - gussetWeldingOffset },
          XYOffset(points[1], topVec, -(hFrameEndOffset + gussetBondingLength), pts1[0] + gussetWeldingOffset),
          XYOffset(points[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
          XYOffset(points[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
          { x: xlength / 2 - (gussetWeldingOffset + gussetTopWidth) * jCot, y: xlength / 2 * grd - (gussetWeldingOffset + gussetTopWidth) },
        ],
        Thickness: gussetThickness,
        z: -gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['leftBottomGusset'] = {
        points: [
          { x: -xlength / 2 - (iheight - gussetWeldingOffset) * iCot, y: -xlength / 2 * grd - (iheight - gussetWeldingOffset) },
          XYOffset(points[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[3] - gussetWeldingOffset),
          XYOffset(points[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[0] + gussetWeldingOffset),
          { x: -xlength / 2 - (iheight - gussetWeldingOffset - gussetBottomWidth) * iCot, y: -xlength / 2 * grd - (iheight - gussetWeldingOffset - gussetBottomWidth) },
        ],
        Thickness: gussetThickness,
        z: -gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
    
      result['rightBottomGusset'] = {
        points: [
          { x: xlength / 2 - (jheight - gussetWeldingOffset) * jCot, y: xlength / 2 * grd - (jheight - gussetWeldingOffset) },
          XYOffset(points[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[3] - gussetWeldingOffset),
          XYOffset(points[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[0] + gussetWeldingOffset),
          { x: xlength / 2 - (jheight - gussetWeldingOffset - gussetBottomWidth) * jCot, y: xlength / 2 * grd - (jheight - gussetWeldingOffset - gussetBottomWidth) },
        ],
        Thickness: gussetThickness,
        z: -gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
    
      result['topFrame1'] = {
        points: topFrame[0],
        Thickness: pts1[4],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['topFrame2'] = {
        points: topFrame[1],
        Thickness: pts1[5],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      // console.log(result)
    
      result['bottomFrame1'] = {
        points: bottomFrame[0],
        Thickness: pts2[4],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['bottomFrame2'] = {
        points: bottomFrame[1],
        Thickness: pts2[5],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
    
      result['leftFrame1'] = {
        points: leftFrame[0],
        Thickness: pts3[4],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['leftFrame2'] = {
        points: leftFrame[1],
        Thickness: pts3[5],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['righttFrame1'] = {
        points: rightFrame[0],
        Thickness: pts3[4],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      result['rightFrame2'] = {
        points: rightFrame[1],
        Thickness: pts3[5],
        z: gussetThickness / 2,
        rotationX: Math.PI / 2,
        rotationY: 0,
        hole: [],
        point: centerPoint
      };
      let dummyPoints = [...points, bottomCenter];
      dummyPoints.forEach(function(elem){data.push(ToGlobalPoint(centerPoint,elem));});
      let section = [tFrame,bFrame, dFrame];   //사용자로부터 받은 단면요소의 값을 객체로 저장
      return {result, data, section}
    }

  function Xbeam(){
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("xbeamLayout","arr");
      this.addInput("xbeamSectionList","xbeamSectionList");
      this.addInput("sectionDB","sectionDB");
      this.addOutput("diaDict","diaDict");
      this.addOutput("xbeamData","xbaemData");
    }
    
    Xbeam.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
      const xbeamLayout = this.getInputData(2);
      const xbeamSectionList = this.getInputData(3);
      const result = XbeamDict(gridPoint, sectionPointDict, xbeamLayout, xbeamSectionList, this.getInputData(4));
      this.setOutputData(0, result.xbeamSectionDict);
      this.setOutputData(1, result.xbeamData);

    };

  function AnalysisModel(node, frame) {
      let group = new global.THREE.Group();
      let layer = 2; //frame Layer
      let material = new global.THREE.PointsMaterial({ color: 0xff0000, size: 300 });
      let geometry = new global.THREE.Geometry(); // 추후에 bufferGeometry로 변경요망
      let initPoint = node.node.data[0].coord;
      let greenLine = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });
      let aquaLine = new global.THREE.LineBasicMaterial({ color: 0x00ffff });
      let yellowLine = new global.THREE.LineBasicMaterial({ color: 0xffff00 });
      let circleMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffff00 });
      let elemDict = {};
      for (let i in node.node.data) {
          let pt = new global.THREE.Vector3(
              node.node.data[i].coord[0] - initPoint[0],
              node.node.data[i].coord[1] - initPoint[1],
              node.node.data[i].coord[2] - initPoint[2]);
          geometry.vertices.push(pt);
          let text = new global.SpriteText(node.node.data[i].nodeNum, 150);
          text.position.set(pt.x, pt.y, pt.z);
          text.layers.set(layer);
          text.backgroundColor = "red";
          group.add(text);
      }

      for (let i in node.rigid.data) {
          let mNum = node.rigid.data[i].master - 1;
          for (let j in node.rigid.data[i].slave) {
              let sNum = node.rigid.data[i].slave[j] - 1;
              let geo = new global.THREE.Geometry();
              geo.vertices.push(geometry.vertices[mNum], geometry.vertices[sNum]);
              group.add(new global.THREE.Line(geo, aquaLine));
          }
      }

      for (let i in frame.frame.data) {
          let geo = new global.THREE.Geometry();
          let iNum = frame.frame.data[i].iNode - 1;
          let jNum = frame.frame.data[i].jNode - 1;
          elemDict[frame.frame.data[i].number] = [iNum, jNum];
          geo.vertices.push(geometry.vertices[iNum], geometry.vertices[jNum]);
          group.add(new global.THREE.Line(geo, greenLine));

          let text = new global.SpriteText(frame.frame.data[i].number, 150, "red");
          text.position.set(
              (geometry.vertices[iNum].x + geometry.vertices[jNum].x)/2, 
              (geometry.vertices[iNum].y + geometry.vertices[jNum].y)/2, 
              (geometry.vertices[iNum].z + geometry.vertices[jNum].z)/2);
          text.layers.set(layer);
          group.add(text);
      }


      // group.add(new THREE.Points(geometry, material));


      for (let i in frame.selfWeight.data) {
          let geo = new global.THREE.Geometry();
          let ivec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][0]];
          let jvec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][1]];
          let izload = -1 * frame.selfWeight.data[i].Uzp[0] / 10;
          let jzload = -1 * frame.selfWeight.data[i].Uzp[1] / 10;
          geo.vertices.push(ivec,
              new global.THREE.Vector3(ivec.x, ivec.y, ivec.z + izload),
              new global.THREE.Vector3(jvec.x, jvec.y, jvec.z + jzload),
              jvec);
          group.add(new global.THREE.Line(geo, aquaLine));
      }
      let arrow = 200;
      for (let i in node.boundary.data) {
          // let arrow = new THREE.Group();
          let nodeNum = node.boundary.data[i].nodeNum - 1;
          let vec = geometry.vertices[nodeNum];
          let localData = node.local.data.find(function (elem) { return elem.nodeNum === node.boundary.data[i].nodeNum });
          let geo = new global.THREE.Geometry();
          if (node.boundary.data[i].DOF[0] === false) {
              geo.vertices.push(
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(-1000 + arrow, arrow, 0),
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(-1000 + arrow, -arrow, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(1000 - arrow, arrow, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(1000 - arrow, -arrow, 0),
              );
          }
          if (node.boundary.data[i].DOF[1] === false) {
              geo.vertices.push(
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(arrow, -1000 + arrow, 0),
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(-arrow, -1000 + arrow, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(arrow, 1000 - arrow, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(-arrow, 1000 - arrow, 0),
              );
          }
          if (node.boundary.data[i].DOF[0] && node.boundary.data[i].DOF[1]) {
              let circle = new global.THREE.CircleGeometry(arrow, 16);
              circle.translate(vec.x, vec.y, vec.z);
              group.add(new global.THREE.Mesh(circle, circleMaterial));
          }
          geo.rotateZ(localData.ANG * Math.PI / 180);
          geo.translate(vec.x, vec.y, vec.z);
          group.add(new global.THREE.LineSegments(geo, yellowLine));

          // group.add(arrow)
      }

      return group
  }

  function LineView(linepoints, initPoint, color) {
      var group = new global.THREE.Group();
      var geometry = new global.THREE.Geometry();
      const xInit = initPoint.x;
      const yInit = initPoint.y;
      const zInit = initPoint.z;
      for (let i = 0; i < linepoints.length; i++) {
          geometry.vertices.push(
              new global.THREE.Vector3(linepoints[i].x - xInit, linepoints[i].y - yInit, linepoints[i].z - zInit));
      }
      var colorCode = color ? color : 0xffff00;  //  : 
      var line = new global.THREE.Line(
          geometry, new global.THREE.LineBasicMaterial({ color: parseInt(colorCode, 16) })
      );
      group.add(line);
      return group
  }

  function SteelBoxView(steelBoxDict, initPoint) {
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
      for (let key in steelBoxDict) {

          steelBoxDict[key]["points"].forEach(function (plist) {
              if (plist.length > 0) {
                  let geometry = new global.THREE.Geometry();
                  for (let i = 0; i < plist.length; i++) {
                      geometry.vertices.push(new global.THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z));
                  }

                  for (let i = 0; i < plist.length / 4 - 1; i++) {
                      for (let j = 0; j < 4; j++) {
                          let k = j + 1 === 4 ? 0 : j + 1;
                          geometry.faces.push(new global.THREE.Face3(i * 4 + j, i * 4 + k, (i + 1) * 4 + j));
                          geometry.faces.push(new global.THREE.Face3(i * 4 + k, (i + 1) * 4 + k, (i + 1) * 4 + j));
                      }
                      if (i === 0) {
                          geometry.faces.push(new global.THREE.Face3(0, 1, 2));
                          geometry.faces.push(new global.THREE.Face3(0, 2, 3));
                      } else if (i === (plist.length / 4 - 2)) {
                          geometry.faces.push(new global.THREE.Face3((i + 1) * 4, (i + 1) * 4 + 1, (i + 1) * 4 + 2));
                          geometry.faces.push(new global.THREE.Face3((i + 1) * 4, (i + 1) * 4 + 2, (i + 1) * 4 + 3));
                      }
                  }

                  geometry.computeFaceNormals();
                  group.add(new global.THREE.Mesh(geometry, meshMaterial));
              }
          });
      }
      return group
  }

  function DiaView(diaDict, initPoint) {
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
      for (let diakey in diaDict) {
          for (let partkey in diaDict[diakey]) {
              let shapeNode = diaDict[diakey][partkey].points;
              let Thickness = diaDict[diakey][partkey].Thickness;
              let zPosition = diaDict[diakey][partkey].z;
              let rotationY = diaDict[diakey][partkey].rotationY;
              let rotationX = diaDict[diakey][partkey].rotationX;
              let hole = diaDict[diakey][partkey].hole;
              let point = diaDict[diakey].point ? diaDict[diakey].point : diaDict[diakey][partkey].point;
              if (partkey !== "point") {
                  group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
              }
          }
      }
      return group
  }

  function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial) {
      var shape = new global.THREE.Shape();
      var shapeNodeVectors = [];
      for (let i = 0; i < shapeNode.length; i++) {
          shapeNodeVectors.push(new global.THREE.Vector2(shapeNode[i].x, shapeNode[i].y));
      }
      shape.setFromPoints(shapeNodeVectors);
      if (hole.length > 0) {
          var holeVectors = [];
          for (let i = 0; i < hole.length; i++) {
              holeVectors.push(new global.THREE.Vector2(hole[i].x, hole[i].y));
          }
          var holeShape = new global.THREE.Shape();
          holeShape.setFromPoints(holeVectors);
          shape.holes.push(holeShape);
      }

      var geometry = new global.THREE.ExtrudeBufferGeometry(shape, { depth: Thickness, steps: 1, bevelEnabled: false });
      var mesh = new global.THREE.Mesh(geometry, meshMaterial);
      var rad = Math.atan(- point.normalCos / point.normalSin) + Math.PI / 2;  //+ 

      mesh.rotation.set(rotationX, rotationY, 0); //(rotationY - 90)*Math.PI/180
      mesh.rotateOnWorldAxis(new global.THREE.Vector3(0, 0, 1), rad);
      mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
      mesh.translateZ(zPosition);
      return mesh
  }

  function HBracingPlateView(hBraicngPlateDict, initPoint) {
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
      for (let pk in hBraicngPlateDict) {
          //    let point = pointDict[pk]
          for (let partkey in hBraicngPlateDict[pk]) {
              if (partkey !== "point") {
                  let shapeNode = hBraicngPlateDict[pk][partkey].points;
                  let Thickness = hBraicngPlateDict[pk][partkey].Thickness;
                  let zPosition = hBraicngPlateDict[pk][partkey].z;
                  let rotationY = hBraicngPlateDict[pk][partkey].rotationY;
                  let rotationX = hBraicngPlateDict[pk][partkey].rotationX;
                  let hole = hBraicngPlateDict[pk][partkey].hole;
                  let point = hBraicngPlateDict[pk].point ? hBraicngPlateDict[pk].point : hBraicngPlateDict[pk][partkey].point;
                  group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
              }
          }
      }
      return group
  }

  function HBracingView(hBracingDict, initPoint) {
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
      for (let i in hBracingDict) {
          group.add(convexMesh(hBracingDict[i].points[0], initPoint, meshMaterial));
          group.add(convexMesh(hBracingDict[i].points[1], initPoint, meshMaterial));
      }
      return group
  }

  function convexMesh(plist, initPoint, meshMaterial) {
      let geometry = new global.THREE.Geometry();
      for (let i in plist) {
          geometry.vertices.push(new global.THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z));
      }
      let j = plist.length / 2;
      for (let i = 0; i < j; i++) {
          let k = i + 1 === j ? 0 : i + 1;
          geometry.faces.push(new global.THREE.Face3(k, i, i + j));
          geometry.faces.push(new global.THREE.Face3(k, i + j, k + j));
      }
      geometry.computeFaceNormals();
      return new global.THREE.Mesh(geometry, meshMaterial)
  }

  function DeckPointView(deckPointDict, initPoint, opacity) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0x000000,
          emissive: 0x777777,
          opacity: opacity,
          // side: THREE.DoubleSide,
          transparent: true,
          wireframe: false
      });
      // let meshMaterial = new THREE.MeshNormalMaterial()
      //     meshMaterial.side = THREE.DoubleSide
      let pNum = deckPointDict[0].slabUpperPoints.length + deckPointDict[0].slabLowerPoints.length;
      let geometry = new global.THREE.Geometry();
      for (let key in deckPointDict) {
          deckPointDict[key].slabUpperPoints.forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
          deckPointDict[key].slabLowerPoints.reverse().forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
      }
      for (let i = 0; i < deckPointDict.length - 1; i++) {
          for (let j = 0; j < pNum; j++) {
              let k = j === pNum - 1 ? 0 : j + 1;
              geometry.faces.push(new global.THREE.Face3(i * pNum + j, i * pNum + k, (i + 1) * pNum + j));
              geometry.faces.push(new global.THREE.Face3(i * pNum + k, (i + 1) * pNum + k, (i + 1) * pNum + j));
          }
          if (i === 0) {
              geometry.faces.push(new global.THREE.Face3(i * pNum, (i + 1) * pNum - 1, i * pNum + 1));
              geometry.faces.push(new global.THREE.Face3(i * pNum + 1, i * pNum + 3, i * pNum + 2));
              for (let j = 1; j < pNum - 3; j++) {
                  geometry.faces.push(new global.THREE.Face3((i + 1) * pNum - j, (i + 1) * pNum - j - 1, i * pNum + 1));
              }
          } else if (i === deckPointDict.length - 2) {
              geometry.faces.push(new global.THREE.Face3((i + 1) * pNum, (i + 1) * pNum + 1, (i + 2) * pNum - 1));
              geometry.faces.push(new global.THREE.Face3((i + 1) * pNum + 1, (i + 1) * pNum + 2, (i + 1) * pNum + 3));
              for (let j = 1; j < pNum - 3; j++) {
                  geometry.faces.push(new global.THREE.Face3((i + 2) * pNum - j, (i + 1) * pNum + 1, (i + 2) * pNum - j - 1));
              }
          }
      }
      geometry.computeFaceNormals();
      group.add(new global.THREE.Mesh(geometry, meshMaterial));

      return group
  }

  function boltView(spliceDict, initPoint) {
      var group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshNormalMaterial()
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0xffffff,
          emissive: 0x000000,
          opacity: 1,
          side: global.THREE.DoubleSide,
          transparent: false,
          wireframe: false
      });

      // let bolt0 = { startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 }
      // var radius = bolt0.size/2
      // var geometry = new THREE.CylinderBufferGeometry(radius,radius,bolt0.t*2+bolt0.l,6,1)
      // let dummyList = [];
      for (let key in spliceDict) {
          //    let point = nameToPointDict[diakey]
          for (let partkey in spliceDict[key]) {
              let Thickness = spliceDict[key][partkey].Thickness;
              let zPosition = spliceDict[key][partkey].z;
              let rotationY = spliceDict[key][partkey].rotationY + Math.PI / 2;
              let rotationX = spliceDict[key][partkey].rotationX;
              let point = spliceDict[key][partkey].point;
              if (spliceDict[key][partkey].bolt) {
                  let bolt = spliceDict[key][partkey].bolt;
                  for (let k in bolt) {
                      for (let i = 0; i < bolt[k].gNum; i++) {
                          for (let j = 0; j < bolt[k].pNum; j++) {
                              let xtranslate = bolt[k].startPoint.x - i * bolt[k].G;
                              let ytranslate = bolt[k].startPoint.y - j * bolt[k].P;
                              group.add(boltMesh(point, bolt[k], zPosition + Thickness, rotationX, rotationY, [xtranslate, ytranslate], initPoint, meshMaterial));
                              // dummyList.push(instancedBoltMesh(point, bolt[k], zPosition+Thickness, rotationX, rotationY,[xtranslate,ytranslate], initPoint))
                          }
                      }
                  }
              }
          }
      }
      // console.log("dummyList",dummyList)
      // let mesh = new THREE.InstancedMesh(geometry, meshMaterial,dummyList.length)
      // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
      // for (let i in dummyList){
      //     mesh.setMatrixAt(i,dummyList[i].matrix)
      // }
      // mesh.instanceMatrix.needsUpdate = true;
      // group.add(mesh)
      return group
  }

  function boltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate, initPoint, meshMaterial) {
      var radius = bolt.size / 2;
      var geometry = new global.THREE.CylinderBufferGeometry(radius, radius, bolt.t * 2 + bolt.l, 6, 1);
      var mesh = new global.THREE.Mesh(geometry, meshMaterial);
      var rad = Math.atan(- point.normalCos / point.normalSin) + Math.PI / 2;  //+ 
      mesh.rotation.set(rotationX, rotationY, Math.PI / 2); //(rotationY - 90)*Math.PI/180
      mesh.rotateOnWorldAxis(new global.THREE.Vector3(0, 0, 1), rad);
      mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
      mesh.translateY(zPosition - bolt.l / 2);
      mesh.translateX(XYtranslate[1]);
      mesh.translateZ(XYtranslate[0]);
      return mesh
  }

  function StudMeshView(studList, initPoint) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshNormalMaterial();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0xffffff,
      //     emissive: 0x000000,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      // } );
      for (let i in studList) {
          var geometry = new global.THREE.CylinderBufferGeometry(studList[i].stud.dia / 2, studList[i].stud.dia / 2, studList[i].stud.height, 8, 1);
          var geometry2 = new global.THREE.CylinderBufferGeometry(studList[i].stud.headDia / 2, studList[i].stud.headDia / 2, studList[i].stud.headDepth, 8, 1);
          let rotationX = Math.atan(studList[i].gradientX);
          let rotationY = Math.atan(studList[i].gradientY);
          for (let j in studList[i].points) {
              let point = studList[i].points[j];
              var mesh = new global.THREE.Mesh(geometry, meshMaterial);
              var mesh2 = new global.THREE.Mesh(geometry2, meshMaterial);
              mesh.rotation.set(rotationX + Math.PI / 2, rotationY, 0);
              mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
              mesh.translateY(studList[i].stud.height / 2);
              mesh2.rotation.set(rotationX + Math.PI / 2, rotationY, 0);
              mesh2.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
              mesh2.translateY(studList[i].stud.height - studList[i].stud.headDepth / 2);
              group.add(mesh);
              group.add(mesh2);
          }
      }
      return group
  }

  function BarrierPointView(deckSection, initPoint, opacity) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0x000000,
          emissive: 0x777777,
          opacity: opacity,
          // side:THREE.DoubleSide,
          transparent: true,
          wireframe: false
      });
      // let meshMaterial = new THREE.MeshNormalMaterial()
      //     meshMaterial.side = THREE.DoubleSide

      let pNum = deckSection[0].points.length;
      let geometry = new global.THREE.Geometry();
      for (let key in deckSection) {
          deckSection[key].points.forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
      }

      for (let i = 0; i < deckSection.length - 1; i++) {
          for (let j = 0; j < pNum - 1; j++) {
              geometry.faces.push(new global.THREE.Face3(i * pNum + j, (i + 1) * pNum + j, i * pNum + j + 1));
              geometry.faces.push(new global.THREE.Face3(i * pNum + j + 1, (i + 1) * pNum + j, (i + 1) * pNum + j + 1));
          }
          if (i === 0) {
              for (let j = 1; j < pNum - 1; j++) {
                  geometry.faces.push(new global.THREE.Face3(i, i + j, i + j + 1));
              }
          } else if (i === deckSection.length - 2) {
              for (let j = 1; j < pNum - 1; j++) {
                  geometry.faces.push(new global.THREE.Face3((i + 1) * pNum, (i + 1) * pNum + j + 1, (i + 1) * pNum + j));
              }
          }
      }
      geometry.computeFaceNormals();
      group.add(new global.THREE.Mesh(geometry, meshMaterial));
      return group
  }

  function LineViewer(){
    this.addInput("points","points");
    this.addInput("initPoint","point");
    this.addInput("color","string");
  }
  LineViewer.prototype.onExecute = function() {
  };

  LineViewer.prototype.on3DExecute = function() {
    const points = this.getInputData(0);
    const initPoint = this.getInputData(1)?this.getInputData(1):points[0];
    const color = this.getInputData(2);
    console.log(this.getInputData(1)?true:false);
    console.log(initPoint,color);
    let mesh = LineView(points,initPoint,color);
    global.sceneAdder({layer:2, mesh:mesh},"line");
  };

  function SteelPlateView(){
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("Point","Point");
  }

  SteelPlateView.prototype.onExecute = function() {
    const steeBoxDict = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const group = SteelBoxView(steeBoxDict,initPoint);
    global.sceneAdder({ layer: 0, mesh: group},"steelbox"); 
  };

  function DiaPhragmView(){
    this.addInput("diaDict","diaDict");
    this.addInput("Point","Point");
    this.addInput("keyName","string");
  }

  DiaPhragmView.prototype.onExecute = function() {
    const diaDict = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const keyName = this.getInputData(2);
    const group = DiaView(diaDict,initPoint);
    // let n = Math.random().toFixed(5)
    // console.log("random", n)
    global.sceneAdder({ layer: 0, mesh: group},keyName ); 
  };

  function HorBracingView(){
      this.addInput("hBracingDict","hBracingDict");
      this.addInput("Point","Point");
    }
    
    HorBracingView.prototype.onExecute = function() {
      const hb = this.getInputData(0);
      const initPoint = this.getInputData(1);
      const group = HBracingView(hb.hBracingDict,initPoint);
      const group2 = HBracingPlateView(hb.hBracingPlateDict,initPoint);
      global.sceneAdder({ layer: 0, mesh: group}, "hbracing"); 
      global.sceneAdder({ layer: 0, mesh: group2},"hbracingPlate"); 
    };
    
    function DeckView(){
      this.addInput("deckPointDict","deckPointDict");  
      this.addInput("Point","Point");
      this.addInput("opacity","number");
    }
    
    DeckView.prototype.onExecute = function() {
      global.sceneAdder({ layer: 0, 
          mesh: DeckPointView(this.getInputData(0),this.getInputData(1),this.getInputData(2))
      },"deck"); 
    };

    function SpliceBoltView(){
      this.addInput("spliceDict","diaDict");  
      this.addInput("Point","Point");
    }
    
    SpliceBoltView.prototype.onExecute = function() {
      global.sceneAdder({ layer: 0, 
          mesh: boltView(this.getInputData(0),this.getInputData(1))
      },"bolt"); 
    };

    function StudView(){
      this.addInput("studList","studList");  
      this.addInput("Point","Point");
    }
    
    StudView.prototype.onExecute = function() {
      global.sceneAdder({ layer: 0, 
          mesh: StudMeshView(this.getInputData(0),this.getInputData(1))
      },"stud"); 
    };

    function BarrierView(){
      this.addInput("deckPointDict","deckPointDict");  
      this.addInput("Point","Point");
      this.addInput("opacity","number");
    }
    
    BarrierView.prototype.onExecute = function() {
      const decPoint = this.getInputData(0);
      for (let key in decPoint){
        global.sceneAdder({ layer: 0, 
            mesh: BarrierPointView(decPoint[key],this.getInputData(1),this.getInputData(2))
        },"Barrier"+key);
      }
    };

    function RebarView(){
      this.addInput("deckRebar","deckRebar");  
      this.addInput("Point","Point");
    }
    
    RebarView.prototype.onExecute = function() {
      const deckRebar= this.getInputData(0);
      for (let i in deckRebar.r1){
        global.sceneAdder({ layer : 0, mesh : LineView(deckRebar.r1[i], this.getInputData(1),0xff00ff)}, "rebar1" + i);
      }
      for (let i in deckRebar.r2){
        global.sceneAdder({ layer : 0, mesh : LineView(deckRebar.r2[i], this.getInputData(1),0x00ff00)}, "rebar2" + i);
      }

    };
    



  function InitPoint(){
    this.addInput("gridPoint","gridPoint");
    this.addOutput("Point","Point");
  }

  InitPoint.prototype.onExecute = function() {
    this.getInputData(0);
    this.setOutputData(0, this.getInputData(0)["G1S1"]);
  };


  function AnalysisView() {
    this.addInput("nodeInput", "nodeInput");
    this.addInput("frameInput", "frameInput");
  }

  AnalysisView.prototype.onExecute = function () {
    global.sceneAdder({ layer : 2, mesh : AnalysisModel(this.getInputData(0),this.getInputData(1))}, "analysis");
  };

  // import makerjs from 'makerjs'

  function GirderLayoutView(girderLayout) { //종단/평면선형에서의 거더 배치 뷰
      let scale = 0.01; // scale 은 추후 외부에서 받아오는 변수로 지정할 계획임
      let group = new global.THREE.Group();
      let skewLength = 5000;
      let aquaLine = new global.THREE.LineBasicMaterial({ color: 0x00ffff });
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 30, gapSize: 10, });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let leftLine = [];
      let rightLine = [];
      let label = [];
      let fontSize = 80;
      let initPoint = { x: girderLayout.masterLine.HorizonDataList[0][0], y: girderLayout.masterLine.HorizonDataList[0][1] };
      let layerNum = 3;
      let sign = - 1;
      for (let key in girderLayout.gridKeyPoint) {
          let pt = girderLayout.gridKeyPoint[key];
          let angle = (girderLayout.gridKeyPoint[key].skew - 90) * Math.PI / 180;
          let pt1 = {
              x: pt.x + (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
              y: pt.y + (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
          };
          let pt2 = {
              x: pt.x - (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
              y: pt.y - (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
          };
          let bar = [{ x: (pt1.x - initPoint.x) * scale, y: (pt1.y - initPoint.y) * scale },
          { x: (pt2.x - initPoint.x) * scale, y: (pt2.y - initPoint.y) * scale }];

          let rot = Math.atan2(pt.normalSin, pt.normalCos);
          if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
          sign = sign === 1 ? -1 : 1;
          let cos = Math.cos(rot);
          let sin = Math.sin(rot);
          let dimLine = [{ x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale },
          { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 2 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 2 + cos * fontSize * 2 },
          { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 8 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 8 + cos * fontSize * 2 }];
          let station = pt.masterStationNumber;
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 2.25, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 2.25, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

          label.push({
              text: "x:" + (pt.x / 1000).toFixed(4) + ", y:" + (pt.y / 1000).toFixed(4),
              anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 1.75, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 1.75, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

          leftLine.push(bar[0]);
          rightLine.push(bar[1]);
          group.add(LineMesh(dimLine, redLine));
          group.add(LineMesh(bar, aquaLine));
      }
      for (let i in girderLayout.girderLine) {
          let girderLine = [];
          for (let j in girderLayout.girderLine[i]) {
              girderLine.push({
                  x: (girderLayout.girderLine[i][j].x - initPoint.x) * scale,
                  y: (girderLayout.girderLine[i][j].y - initPoint.y) * scale
              });
          }
          group.add(LineMesh(girderLine, redDotLine, -1));
      }
      group.add(LineMesh(leftLine, aquaLine));
      group.add(LineMesh(rightLine, aquaLine));
      group.add(LabelInsert(label, textMaterial, layerNum));  //layer number is 3

      let group2 = new global.THREE.Group();
      let vl = girderLayout.masterLine.VerticalDataList;
      initPoint = { x: vl[0][0], y: vl[0][1] };
      let xscale = 0.003;//종단선형뷰하고 동일한 스케일을 유지하도록
      let yscale = 0.02;
      let topLine = [];
      let botLine = [];
      for (let key in girderLayout.gridKeyPoint) {
          let pt = girderLayout.gridKeyPoint[key];
          let pt1 = {
              x: (pt.masterStationNumber - initPoint.x) * xscale,
              y: (pt.z - initPoint.y) * yscale + fontSize / 4
          };
          let pt2 = {
              x: (pt.masterStationNumber - initPoint.x) * xscale,
              y: (pt.z - initPoint.y) * yscale - fontSize / 4
          };
          group2.add(LineMesh([pt1, pt2], aquaLine));
          topLine.push(pt1);
          botLine.push(pt2);
      }
      group2.add(LineMesh(topLine, aquaLine));
      group2.add(LineMesh(botLine, aquaLine));

      return { plan: group, side: group2 }
  }

  function LineSideView(masterLine) {  //종단선형뷰
      let xscale = 0.003;
      let yscale = 0.02;
      let fontSize = 80;
      let layerNum = 4;
      let group = new global.THREE.Group();
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let blueLine = new global.THREE.LineBasicMaterial({ color: 0x0000ff });
      let greenLine = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });
      let whiteLine = new global.THREE.LineBasicMaterial({ color: 0xffffff });
      let grayLine = new global.THREE.LineBasicMaterial({ color: 0x888888 });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff

      let vl = masterLine.VerticalDataList;
      let points = [];
      let linePoints = [];
      let label = [];
      let initPoint = { x: vl[0][0], y: vl[0][1] };
      let leftGrad = [];
      let rightGrad = [];

      for (let i in masterLine.points) {
          linePoints.push({ x: (masterLine.points[i].masterStationNumber - initPoint.x) * xscale, y: (masterLine.points[i].z - initPoint.y) * yscale });
      }
      for (let i in vl) {
          let x = (vl[i][0] - initPoint.x) * xscale;
          let y = (vl[i][1] - initPoint.y) * yscale;
          points.push({ x, y });
          let bar = [{ x, y },
          { x, y: -5 * fontSize }];
          group.add(LineMesh(bar, redLine));
          let station = vl[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          let el = vl[i][1] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });

      }
      for (let i in masterLine.parabolaData) {
          let x1 = (masterLine.parabolaData[i][0] - initPoint.x) * xscale;
          let x2 = (masterLine.parabolaData[i][1] - initPoint.x) * xscale;
          let y1 = (masterLine.parabolaData[i][2] - initPoint.y) * yscale;
          let y2 = (masterLine.parabolaData[i][3] - initPoint.y) * yscale;
          group.add(LineMesh([{ x: x1, y: y1 }, { x: x1, y: - 5 * fontSize }, { x: x2, y: - 5 * fontSize }, { x: x2, y: y2 }], blueLine));
          label.push({
              text: "L=" + (masterLine.parabolaData[i][4] / 1000).toFixed(4),
              anchor: [(x1 + x2) / 2, - 5.25 * fontSize, 0],
              rotation: 0,
              align: "center",
              fontSize: fontSize / 4
          });
          let station = masterLine.parabolaData[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x1 - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          let el = masterLine.parabolaData[i][2] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x1 + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          station = masterLine.parabolaData[i][1];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x2 - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          el = masterLine.parabolaData[i][3] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x2 + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });

      }

      for (let i = 0; i < masterLine.tangent.length; i++) {
          let x = ((vl[i][0] + vl[i + 1][0]) / 2 - initPoint.x) * xscale;
          let y = ((vl[i][1] + vl[i + 1][1]) / 2 - initPoint.y) * yscale;
          let rot = Math.atan(masterLine.tangent[i]) * yscale / xscale;
          label.push({
              text: "S=" + (masterLine.tangent[i] * 100).toFixed(2) + "%",
              anchor: [x, y + 0.25 * fontSize, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });
      }

      let offset = -15 * fontSize;
      let superElCenter = [];
      for (let i in masterLine.SuperElevation) {
          let x = (masterLine.SuperElevation[i][0] - initPoint.x) * xscale;
          let y = offset;
          group.add(LineMesh([{ x, y: y + 5 * fontSize }, { x, y: y - 8 * fontSize }], redLine));
          superElCenter.push({ x, y });
          leftGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][1] });
          rightGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][2] });
          let station = masterLine.SuperElevation[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x - fontSize / 4, y - 8 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
      }
      for (let i = 0; i < 11; i++) {
          group.add(LineMesh([{ x: superElCenter[0].x, y: offset + (5 - i) * fontSize }, { x: superElCenter[superElCenter.length - 1].x, y: offset + (5 - i) * fontSize }], grayLine));
          label.push({
              text: (10 - i * 2).toFixed(0) + "%",
              anchor: [superElCenter[0].x - fontSize, offset + (5 - i) * fontSize, 0],
              rotation: 0,
              align: "center",
              fontSize: fontSize / 4
          });
      }
      group.add(LineMesh(superElCenter, redLine));
      group.add(LineMesh(leftGrad, blueLine, 1));
      group.add(LineMesh(rightGrad, greenLine, 1));
      group.add(LineMesh(linePoints, whiteLine, 1));
      group.add(LineMesh(points, blueLine));
      group.add(LabelInsert(label, textMaterial, layerNum));  //layer number is 3

      return group
  }

  function LineDrawView(masterLine, slaveLines) {  //평면선형 그리기
      let scale = 0.01;
      let group = new global.THREE.Group();
      let IPpoints = [];
      let linePoints = [];
      let label = [];
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let blueLine = new global.THREE.LineBasicMaterial({ color: 0x0000ff });
      let whiteLine = new global.THREE.LineBasicMaterial({ color: 0xffffff });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let fontSize = 80;
      let segName = { 0: "ETC", 1: "BTC", 2: "BC", 3: "EC" };

      let initPoint = { x: masterLine.HorizonDataList[0][0], y: masterLine.HorizonDataList[0][1] };
      for (let i in masterLine.HorizonDataList) {
          IPpoints.push({ x: (masterLine.HorizonDataList[i][0] - initPoint.x) * scale, y: (masterLine.HorizonDataList[i][1] - initPoint.y) * scale });
      }
      for (let i in masterLine.points) {
          let station = masterLine.points[i].masterStationNumber / 1000;
          if ((station % 20).toFixed(0) === "0") {
              linePoints.push({ x: (masterLine.points[i].x - initPoint.x) * scale, y: (masterLine.points[i].y - initPoint.y) * scale });
              let rot = Math.atan2(masterLine.points[i].normalSin, masterLine.points[i].normalCos);
              if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
              let cos = Math.cos(rot);
              let sin = Math.sin(rot);
              let bar = [{ x: (masterLine.points[i].x - initPoint.x) * scale + cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale + sin * fontSize / 4 },
              { x: (masterLine.points[i].x - initPoint.x) * scale - cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale - sin * fontSize / 4 }];
              group.add(LineMesh(bar, whiteLine));
              label.push({
                  text: (masterLine.points[i].masterStationNumber / 1000).toFixed(4),
                  anchor: [bar[0].x + cos * fontSize / 4, bar[0].y + sin * fontSize / 4, 0],
                  rotation: rot,
                  align: "left",
                  fontSize: fontSize / 4
              });
          }
      }

      for (let i = 1; i < masterLine.segments.start.length; i++) {
          let station = masterLine.segments.start[i];
          let pt = PointGenerator(station, masterLine, 90);
          let rot = Math.atan2(pt.normalSin, pt.normalCos);
          if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
          let cos = Math.cos(rot);
          let sin = Math.sin(rot);
          let bar = [{ x: (pt.x - initPoint.x) * scale + cos * fontSize * 6, y: (pt.y - initPoint.y) * scale + sin * fontSize * 6 },
          { x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale }];
          group.add(LineMesh(bar, redLine));
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [bar[1].x + cos * fontSize * 4 + sin * fontSize / 4, bar[1].y + sin * fontSize * 4 - cos * fontSize / 4, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });
          label.push({
              text: segName[i % 4],
              anchor: [bar[1].x + cos * fontSize * 4 - sin * fontSize / 4, bar[1].y + sin * fontSize * 4 + cos * fontSize / 4, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

      }


      for (let i = 0; i < IPpoints.length; i++) {
          let circle = new global.THREE.EllipseCurve(IPpoints[i].x, IPpoints[i].y, 20, 20);
          let cp = circle.getPoints(16);
          let circlegeo = new global.THREE.Geometry().setFromPoints(cp);
          let IPCircle = new global.THREE.Line(circlegeo, redLine);
          group.add(IPCircle);
          let ipName = i === 0 ? "BP" : i === (IPpoints.length - 1) ? "EP" : "IP" + i;
          label.push({
              text: ipName,
              anchor: [IPpoints[i].x, IPpoints[i].y + 100, 0],
              rotation: 0,
              fontSize: fontSize
          });

      }
      group.add(LineMesh(linePoints, whiteLine));
      group.add(LineMesh(IPpoints, blueLine));
      group.add(LabelInsert(label, textMaterial, 3));  //layer number is 3

      return group
  }

  function LabelInsert(label, textMaterial, layer) {
      let group = new global.THREE.Group();
      var loader = new global.THREE.FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
          // console.log(font)
          // var font = {generateShapes:(messagem , num)=>{}}
          for (let i in label) {
              var shapes = font.generateShapes(label[i].text, label[i].fontSize);
              var geometry = new global.THREE.ShapeBufferGeometry(shapes);
              if (label[i].align === "left") {
                  geometry.translate(0, -label[i].fontSize / 2, 0);
              }
              else {
                  var xMid;
                  geometry.computeBoundingBox();
                  xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                  geometry.translate(xMid, -label[i].fontSize / 2, 0);
              }

              if (label[i].rotation) {
                  geometry.rotateZ(label[i].rotation);
              }
              geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
              // make shape ( N.B. edge view not visible )
              let textMesh = new global.THREE.Mesh(geometry, textMaterial);
              textMesh.layers.set(layer);
              group.add(textMesh);
          }
      });
      return group// text.position.z = 0;
  }

  function ShapePlanView(partDict, pointDict, partkeyNameList, index1, index2, sc, initPoint, r, lineMaterial) { //횡단면도 그리기
      // console.log(partDict)    
      // let result = {models:{},layer:color };
      let meshes = [];

      for (let pk in partDict) {
          let point = pointDict[pk];
          for (let partkey of partkeyNameList) {
              if (partDict[pk].hasOwnProperty(partkey)) {
                  if (partDict[pk][partkey].rotationX !== Math.PI / 2) {
                      let globalPts = [];
                      let pts = [];
                      for (let i in partDict[pk][partkey].points) {
                          globalPts.push(ToGlobalPoint2(point, partDict[pk][partkey].points[i]));
                      }
                      for (let i in globalPts) {
                          let x = (globalPts[i].x - initPoint.x) * sc;
                          let y = (globalPts[i].y - initPoint.y) * sc;
                          pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                      }
                      meshes.push(sectionMesh(pts, lineMaterial));
                      // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                  }
                  else {
                      let globalPts = [];
                      let pts = [];
                      let points = [{ x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z }];
                      for (let i in points) {
                          globalPts.push(ToGlobalPoint2(point, points[i]));
                      }
                      for (let i in globalPts) {
                          let x = (globalPts[i].x - initPoint.x) * sc;
                          let y = (globalPts[i].y - initPoint.y) * sc;
                          pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                      }
                      meshes.push(sectionMesh(pts, lineMaterial));
                      // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                  }
              }
          }
      }
      return meshes
  }

  function GeneralSideView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //측면도 그리기
      // let result = {models:{},layer:lineMaterial }; 
      // let index = 1;
      let meshes = [];
      for (let part in steelBoxDict) {
          for (let name of keyNamelist) {
              if (part.includes(name)) {
                  let ptsL1 = [];
                  let ptsR1 = [];
                  let ptsC1 = [];
                  let ptsL2 = [];
                  let ptsR2 = [];
                  let ptsC2 = [];
                  for (let j in steelBoxDict[part]["points"]) {
                      let pts1 = [];
                      let pts2 = [];
                      for (let i in steelBoxDict[part]["points"][j]) {
                          if (i % sectionPointNum === index1) {
                              let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc;
                              pts1.push({ x, y });
                              // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          } else if (i % sectionPointNum === index2) {
                              let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc;
                              pts2.push({ x, y });
                              // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          }
                      }
                      if (j == 0) {
                          ptsL1.push(...pts1);
                          ptsL2.push(...pts2);
                      }
                      if (j == 1) {
                          ptsR1.push(...pts1);
                          ptsR2.push(...pts2);
                      }
                      if (j == 2) {
                          ptsC1.push(...pts1);
                          ptsC2.push(...pts2);
                      }
                  }
                  if (ptsC1.length === 0) {
                      meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                      meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                  } else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                      if (ptsC1[0][0] === ptsL1[ptsL1.length - 1][0] && ptsC1[0][1] === ptsL1[ptsL1.length - 1][1]) {
                          meshes.push(sectionMesh(
                              [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                      } else {
                          meshes.push(sectionMesh(
                              [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                      }
                  }
                  else if (ptsL1.length === 0 && ptsL1.length === 0) {
                      meshes.push(sectionMesh(
                          [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                  }
              }

          }
      }
      return meshes
  }

  function GeneralPlanView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //강박스 일반도 그리기
      // let result = {models:{},layer:color };
      // let index = 1;
      let meshes = [];
      for (let part in steelBoxDict) {
          for (let name of keyNamelist) {
              if (part.includes(name)) {
                  let ptsL1 = [];
                  let ptsR1 = [];
                  let ptsC1 = [];
                  let ptsL2 = [];
                  let ptsR2 = [];
                  let ptsC2 = [];
                  for (let j in steelBoxDict[part]["points"]) {
                      let pts1 = [];
                      let pts2 = [];
                      for (let i in steelBoxDict[part]["points"][j]) {
                          if (i % sectionPointNum === index1) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts1.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          } else if (i % sectionPointNum === index2) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts2.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          }

                      }
                      if (j == 0) {
                          ptsL1.push(...pts1);
                          ptsL2.push(...pts2);
                      }
                      if (j == 1) {
                          ptsR1.push(...pts1);
                          ptsR2.push(...pts2);
                      }
                      if (j == 2) {
                          ptsC1.push(...pts1);
                          ptsC2.push(...pts2);
                      }
                  }
                  if (ptsC1.length === 0) {
                      meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                      meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                      // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
                      // index +=1
                      // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
                      // index +=1    
                  }

                  else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                      if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x && ptsC1[0].y === ptsL1[ptsL1.length - 1].y) {
                          meshes.push(sectionMesh(
                              [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                      } else {
                          meshes.push(sectionMesh(
                              [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                      }
                  }
                  else if (ptsL1.length === 0 && ptsL1.length === 0) {
                      meshes.push(sectionMesh(
                          [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                  }

              }
          }
      }
      return meshes
  }

  function roundedRect(x, y, rot, width, height, radius, lineMaterial) { //마크 테두리
      let shape = new global.THREE.Shape();
      shape.moveTo(-width / 2, -height / 2 + radius);
      shape.lineTo(-width / 2, height / 2 - radius);
      shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2);
      shape.lineTo(width / 2 - radius, height / 2);
      shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius);
      shape.lineTo(width / 2, -height / 2 + radius);
      shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2);
      shape.lineTo(-width / 2 + radius, -height / 2);
      shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius);
      let points = shape.getPoints();
      let geometry = new global.THREE.BufferGeometry().setFromPoints(points);
      geometry.rotateZ(rot);
      geometry.translate(x, y, 0);
      // console.log("geo", geometry)
      return new global.THREE.Line(geometry, lineMaterial)
  }

  function PointToDraw(point, scale, initPoint, rotate, xOffset, yOffset) { //DrawingPointConverter
      let cos = point.normalCos;
      let sin = point.normalSin;
      let x0 = (point.x - initPoint.x - sin * xOffset - cos * yOffset) * scale;
      let y0 = (point.y - initPoint.y + cos * xOffset - sin * yOffset) * scale;
      return { x: Math.cos(rotate) * x0 - Math.sin(rotate) * y0, y: Math.cos(rotate) * y0 + Math.sin(rotate) * x0 }
  }

  function GridMarkView(girderStation, scale, initPoint, rotate, markOffset, girderIndex) {   //그리드 마크와 보조선 그리기 + 치수선도 포함해서 그릭기

      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
      let geo = new global.THREE.Geometry();
      let dimgeo = new global.THREE.Geometry();
      let fontSize = 80;
      let meshes = [];
      let labels = [];
      let rot = 0;

      let dummy0 = {};
      let dummy1 = {};
      let dummy2 = {};
      let dummy4 = {};
      let sideViewOffset = -8000 * scale;
      let segLength = 0;
      let totalLength = 0;
      let dummyLength = 0;
      let dummyLength2 = 0;

      // for (let i = 0; i < girderStation.length; i++) {
      let girderLine = [];
      let girderSideLine = [];
      let dimLine = []; //8개, w와 동일한 개수
      // let dimWF = [];
      // 지지선 입력체계 수립필요 2020.5.22 by dr.lim
      let dimName = ["Girder Length", "Splice", "Top Plate", "", "", "Bottom Plate", "Web", "V-Stiffener", ""];
      let w = [1.8 * markOffset, 1.6 * markOffset, 1.4 * markOffset, 1.2 * markOffset, -1.2 * markOffset, -1.4 * markOffset,
      sideViewOffset + 1.6 * markOffset, sideViewOffset + 1.4 * markOffset, sideViewOffset + 1.2 * markOffset];    //dim line 기준점
      w.forEach(function(x){ dimLine.push([]); });
      for (let j = 0; j < girderStation.length; j++) {
          let gridObj = girderStation[j];
          let cos = gridObj.point.normalCos;
          let sin = gridObj.point.normalSin;
          rot = Math.atan2(cos, - sin) + rotate;
          if (j !== 0) { segLength = splineProp(dummy0, gridObj.point).length; }        totalLength += segLength;
          // console.log("totalLength", totalLength)
          dummy0 = gridObj.point;
          girderLine.push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, 0));
          girderSideLine.push({ x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 });

          for (let k = 0; k < w.length; k++) {
              if (k > 5) {
                  dimLine[k].push({ x: (totalLength) * scale, y: w[k] });
              }
              else {
                  dimLine[k].push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, w[k]));
              }
          }
          if (j === 0) {
              let position = PointToDraw(gridObj.point, scale, initPoint, rotate, -500, 0);
              labels.push({
                  text: "GIRDER-" + girderIndex + " C.L.",
                  anchor: [position.x, position.y, 0],
                  rotation: rot,
                  fontSize: fontSize * scale
              });
              for (let k = 0; k < w.length; k++) {
                  if (dimName[k] !== "") {
                      let anchor = {};
                      let p1 = {};
                      let p2 = dimLine[k][j];
                      if (k > 5) {
                          anchor = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y + fontSize * 0.75 };
                          p1 = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y };
                      } else {
                          anchor = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k] + fontSize * 0.75);
                          p1 = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k]);
                      }
                      dimgeo.vertices.push(
                          new global.THREE.Vector3(p2.x, p2.y, 0),
                          new global.THREE.Vector3(p1.x, p1.y, 0));
                      labels.push({
                          text: dimName[k],
                          anchor: [anchor.x, anchor.y, 0],
                          rotation: k>5? 0: rot,
                          fontSize: fontSize * scale,
                          align: "left"
                      });
                  }
              }
          }
          if (j === 0 || j === girderStation.length - 1) { //거더총길이
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[0][j].x, dimLine[0][j].y, 0),
                  new global.THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0));
          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP")) {   //현장이음부
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0),
                  new global.THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy1, gridObj.point);
                  // console.log("spline", dimProp,dummy1,gridObj.point)
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[1] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy1 = gridObj.point;

          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("TF")) { //상부플렌지 이음
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0),
                  new global.THREE.Vector3(dimLine[3][j].x, dimLine[3][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy2, gridObj.point);
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[2] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy2 = gridObj.point;

          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("BF")) {  //하부플렌지 이음
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[4][j].x, dimLine[4][j].y, 0),
                  new global.THREE.Vector3(dimLine[5][j].x, dimLine[5][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy4, gridObj.point);
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[5] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy4 = gridObj.point;
          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("WF")) {   //웹플렌지 이음
              // let pt1 = { x: totalLength * scale, y: (sideViewOffset + 1.4 * markOffset) * scale, z: 0 }
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[6][j].x, dimLine[6][j].y, 0),
                  new global.THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0));
              // new THREE.Vector3(totalLength * scale, (sideViewOffset + 1.2 * markOffset) * scale, 0),
              // new THREE.Vector3(pt1.x, pt1.y, pt1.z));
              if (j !== 0) {
                  let position = { x: (totalLength + dummyLength) / 2 * scale, y: (w[6] + fontSize * 0.75) * scale };
                  labels.push({
                      text: (totalLength - dummyLength).toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: 0,
                      fontSize: fontSize * scale
                  });
              }
              dummyLength = totalLength;

          }

          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("V") || gridObj.key.includes("D") || gridObj.key.substr(2, 1) === "S"
              && gridObj.key.substr(3, 1) !== "P") {  // 그리드 기호에 대해서 한번 대대적인 수정이 필요할 것으로 판단됨
              dimgeo.vertices.push(//치수선 라벨
                  new global.THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0),
                  new global.THREE.Vector3(dimLine[8][j].x, dimLine[8][j].y, 0));
              if (j !== 0) {
                  let position = { x: (totalLength + dummyLength2) / 2 * scale, y: (w[7] + fontSize * 0.75) * scale };
                  labels.push({
                      text: (totalLength - dummyLength2).toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: 0,
                      fontSize: fontSize * scale
                  });
              }
              dummyLength2 = totalLength;
          }


          if (gridObj.key.substr(2, 1) !== "K" && !gridObj.key.includes("CR")) { //station.substr(0,2)==="G1" && 
              let position = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset);
              meshes.push(roundedRect(position.x, position.y, rot, 400 * scale, 200 * scale, 100 * scale, redLine));
              labels.push({
                  text: gridObj.key,
                  anchor: [position.x, position.y, 0],
                  rotation: rot,
                  fontSize: fontSize * scale
              });
              let pt1 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset - 100);
              let pt2 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, - markOffset + 100);
              geo.vertices.push(
                  new global.THREE.Vector3(pt1.x, pt1.y, 0),
                  new global.THREE.Vector3(pt2.x, pt2.y, 0));

              // side View gridMark
              position = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + 300 * scale, z: 0 };
              meshes.push(roundedRect(position.x, position.y, 0, 400 * scale, 200 * scale, 100 * scale, redLine));
              labels.push({
                  text: gridObj.key,
                  anchor: [position.x, position.y, 0],
                  rotation: 0,
                  fontSize: fontSize * scale
              });
              pt1 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + 200 * scale, z: 0 };
              pt2 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 };
              geo.vertices.push(
                  new global.THREE.Vector3(pt1.x, pt1.y, 0),
                  new global.THREE.Vector3(pt2.x, pt2.y, 0));


          }
      }

      meshes.push(LineMesh(girderLine, redDotLine, 0));
      meshes.push(LineMesh(girderSideLine, redDotLine, 0));
      for (let k = 0; k < w.length; k++) {
          if (dimName[k]!==""){
              meshes.push(LineMesh(dimLine[k], redLine, 0));
          }
      }
      // meshes.push(LineMesh(dimWF, redLine,0))
      // dimLine.forEach(function (dim) { meshes.push(LineMesh(dim, redLine, 0)) });
      // }
      let segLine = new global.THREE.LineSegments(geo, redDotLine);
      segLine.computeLineDistances();
      let dimSegLine = new global.THREE.LineSegments(dimgeo, redLine);
      meshes.push(segLine);
      meshes.push(dimSegLine);

      return { meshes, labels }
  }

  // r is rotation angle to radian
  function topDraw(steelBoxDict, hBracing, diaDict, vstiffDict, gridPoint, initPoint, girderStation) {
      let group = new global.THREE.Group();

      const hBracingDict = hBracing.hBracingDict;
      const hBracingPlateDict = hBracing.hBracingPlateDict;

      let sc = 0.500;
      let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x));
      let aqua = new global.THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
      let topPlate = GeneralPlanView(steelBoxDict, ["TopPlate"], 4, 0, 1, sc, initPoint, r, aqua);
      topPlate.forEach(function (mesh) { group.add(mesh); });
      let webPlate = GeneralPlanView(steelBoxDict, ["LeftWeB", "RightWeB"], 4, 1, 2, sc, initPoint, r, green);
      webPlate.forEach(function (mesh) { group.add(mesh); });
      let diaphragm = ShapePlanView(diaDict, gridPoint, ["topPlate", "upperTopShape", "leftTopPlateShape"], 0, 1, sc, initPoint, r, green);
      diaphragm.forEach(function (mesh) { group.add(mesh); });
      let bracingPlate = ShapePlanView(hBracingPlateDict, gridPoint, ["plate"], 0, 1, sc, initPoint, r, green);
      bracingPlate.forEach(function (mesh) { group.add(mesh); });
      let vStiffner = ShapePlanView(vstiffDict, gridPoint, ["upperframe1", "upperframe2"], 0, 3, sc, initPoint, r, green);
      vStiffner.forEach(function (mesh) { group.add(mesh); });
      let bracing = GeneralPlanView(hBracingDict, [""], 4, 0, 1, sc, initPoint, r, green);
      bracing.forEach(function (mesh) { group.add(mesh); });

      let gridMark = GridMarkView(girderStation[0], sc, initPoint, r, 1400);
      gridMark.meshes.forEach(function (mesh) { group.add(mesh); });
      group.add(LabelInsert(gridMark.labels, new global.THREE.MeshBasicMaterial({ color: 0xffffff }), 1));

      return group
  }

  function GirderGeneralDraw1(girderStation,layerNum) {
      let group = new global.THREE.Group();
      // let layerNum = 5;
      let scale = 1;
      let girderOffset = 24000;
      let gridMark_width = 1500; // unit : mm
      for (let i = 0; i < girderStation.length; i++) {
          let initPoint = girderStation[i][0].point;
          let endPoint = girderStation[i][girderStation[i].length - 1].point;
          let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x));
          let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, gridMark_width, i + 1);
          gridMark.meshes.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          });
          let label = LabelInsert(gridMark.labels, new global.THREE.MeshBasicMaterial({ color: 0xffffff }), layerNum);
          label.position.set(0, -i * girderOffset, 0);
          group.add(label);
      }
      return group
  }

  function GirderGeneralDraw2(girderStation, steelBoxDict, layerNum) {
      let group = new global.THREE.Group();
      // let layerNum = 5;
      let scale = 1;
      let girderOffset = 24000;
      let gridMark_width = 1500; // unit : mm
      let aqua = new global.THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff

      for (let i = 0; i < girderStation.length; i++) {
          let initPoint = girderStation[i][0].point;
          let endPoint = girderStation[i][girderStation[i].length - 1].point;
          let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x));
          let topPlate = GeneralPlanView(steelBoxDict, ["G" + (i+1).toFixed(0) + "TopPlate"], 4, 0, 1, scale, initPoint, rotate, aqua);
          topPlate.forEach(function (mesh) { 
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh); 
          });
          let webPlate = GeneralPlanView(steelBoxDict, ["G" + (i+1).toFixed(0) + "LeftWeB","G" + (i+1).toFixed(0) + "RightWeB"], 4, 1, 2, scale, initPoint, rotate, green);
          webPlate.forEach(function (mesh) { 
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
           });
          let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, gridMark_width, i + 1);
          gridMark.meshes.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          });
          let label = LabelInsert(gridMark.labels, new global.THREE.MeshBasicMaterial({ color: 0xffffff }), layerNum);
          label.position.set(0, -i * girderOffset, 0);
          group.add(label);
      }
      return group
  }

  function sideDraw(steelBoxDict, hBracing, diaDict, vstiffDict, gridPoint, initPoint) {
      let group = new global.THREE.Group();

      const hBracingDict = hBracing.hBracingDict;
      const hBracingPlateDict = hBracing.hBracingPlateDict;

      let sc = 0.500;
      let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x));
      let aqua = new global.THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff


      let side = GeneralSideView(steelBoxDict, ["G1LeftWeB"], 4, 0, 1, sc, initPoint, r, aqua);
      side.forEach(function (mesh) { group.add(mesh); });

      let textMesh;
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let label = [];

      var loader = new global.THREE.FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
          // console.log(font)
          // var font = {generateShapes:(messagem , num)=>{}}
          for (let i in label) {
              var shapes = font.generateShapes(label[i].text, label[i].fontSize);
              var geometry = new global.THREE.ShapeBufferGeometry(shapes);
              var xMid;
              geometry.computeBoundingBox();
              xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
              geometry.translate(xMid, -label[i].fontSize / 2, 0);
              if (label[i].rotation) {
                  geometry.rotateZ(label[i].rotation);
              }
              geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
              // make shape ( N.B. edge view not visible )
              textMesh = new global.THREE.Mesh(geometry, textMaterial);
              textMesh.layers.set(1);
              group.add(textMesh);
          }
          // text.position.z = 0;
      });

      return group
  }




  function LineMesh(point0, lineMaterial, z) {
      let points = [];
      let z1 = z ? z : 0;
      for (let i in point0) {
          points.push(new global.THREE.Vector3(point0[i].x, point0[i].y, z1));
      }
      let geometry = new global.THREE.Geometry().setFromPoints(points);
      let result = new global.THREE.Line(geometry, lineMaterial);
      result.computeLineDistances();
      return result
  }

  function sectionMesh(point0, lineMaterial) {
      let points = [];
      for (let i in point0) {
          points.push(new global.THREE.Vector3(point0[i].x, point0[i].y, 0));
      }
      let geometry = new global.THREE.Geometry().setFromPoints(points);
      return new global.THREE.LineLoop(geometry, lineMaterial)
  }

  function sectionView(sectionName, sectionPoint, diaPoint) { //횡단면도
      // var makerjs = require('makerjs');
      let sc = 1;
      // let sections = {models:{ }};
      // let captions = { models: {} };
      // let weldings = { models: {} };
      let titlePosition = 1000;
      let titleSize = 100;
      let labelSize = 50;
      // let group = []
      let group = new global.THREE.Group();
      let label = [];
      let weldings = [];

      let textMesh;
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00

      label.push({    //sectiontitle
          text: sectionName,
          anchor: [0, titlePosition, 0],
          fontSize: titleSize
      });

      let circle = new global.THREE.EllipseCurve(0, titlePosition, titleSize * 2.5, titleSize * 2.5);
      let cp = circle.getPoints(16);
      let circlegeo = new global.THREE.Geometry().setFromPoints(cp);
      let titleCircle = new global.THREE.Line(circlegeo, lineMaterial);
      group.add(titleCircle);

      for (var key in sectionPoint) {
          if (sectionPoint[key].constructor === Array) {
              group.add(sectionMesh(sectionPoint[key], lineMaterial));
          }
      }
      for (var key in diaPoint) {
          if (diaPoint[key].points) {
              group.add(sectionMesh(diaPoint[key].points, lineMaterial));
          }
          if (diaPoint[key].size) {
              label.push({
                  text: diaPoint[key].size.Label,
                  anchor: [(diaPoint[key].anchor[0][0] + diaPoint[key].anchor[1][0]) / 2, (diaPoint[key].anchor[0][1] + diaPoint[key].anchor[1][1]) / 2, 0],
                  rotation: Math.atan((diaPoint[key].anchor[1][1] - diaPoint[key].anchor[0][1]) / (diaPoint[key].anchor[1][0] - diaPoint[key].anchor[0][0])),
                  fontSize: labelSize
              });
          }
          if (diaPoint[key].welding) {
              for (let i in diaPoint[key].welding) {
                  weldings.push(weldingMark(diaPoint[key].welding[i], 0.8, sc, 200, true, true, false, false));
              }
          }
      }

      let dims = [];
      dims.push(Dimension([sectionPoint.leftTopPlate[3], sectionPoint.rightTopPlate[3]], 0, sc, 1, true, true, 1));   //top1
      dims.push(Dimension([sectionPoint.leftTopPlate[3], sectionPoint.leftTopPlate[2], sectionPoint.rightTopPlate[2], sectionPoint.rightTopPlate[3]], 0, sc, 1, true, true, 0)); //top2
      dims.push(Dimension([sectionPoint.rWeb[0], sectionPoint.rWeb[1]], 1, sc, 1, false, true, 2)); //right1
      dims.push(Dimension([sectionPoint.rWeb[0], diaPoint.lowerTopShape.points[3], diaPoint.lowerTopShape.points[2], diaPoint.rightTopPlateShape.points[3], diaPoint.rightTopPlateShape.points[0], sectionPoint.rWeb[1]], 5, sc, 1, false, true, 1)); //right2
      dims.push(Dimension([sectionPoint.lWeb[0], sectionPoint.lWeb[1]], 1, sc, 1, false, false, 2)); //left1
      dims.push(Dimension([sectionPoint.lWeb[0], diaPoint.lowerTopShape.points[0], diaPoint.lowerTopShape.points[1], diaPoint.leftTopPlateShape.points[3], diaPoint.leftTopPlateShape.points[0], sectionPoint.lWeb[1]], 5, sc, 1, false, false, 1)); // left2
      dims.push(Dimension([sectionPoint.bottomPlate[3], sectionPoint.lWeb[0], sectionPoint.rWeb[0], sectionPoint.bottomPlate[2]], 0, sc, 1, true, false, 0)); //bottom1
      dims.push(Dimension([sectionPoint.bottomPlate[3], sectionPoint.bottomPlate[2]], 0, sc, 1, true, false, 1)); //botoom2

      // layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

      for (let i in dims) {
          dims[i].meshes.forEach(function (mesh) { group.add(mesh); });
          dims[i].labels.forEach(function (elem) { label.push(elem); });
      }
      for (let i in weldings) {
          weldings[i].meshes.forEach(function (mesh) { group.add(mesh); });
          weldings[i].labels.forEach(function (elem) { label.push(elem); });
      }

      var loader = new global.THREE.FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
          // console.log(font)
          // var font = {generateShapes:(messagem , num)=>{}}
          for (let i in label) {
              var shapes = font.generateShapes(label[i].text, label[i].fontSize);
              var geometry = new global.THREE.ShapeBufferGeometry(shapes);
              var xMid;
              geometry.computeBoundingBox();
              xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
              geometry.translate(xMid, -label[i].fontSize / 2, 0);
              if (label[i].rotation) {
                  geometry.rotateZ(label[i].rotation);
              }
              geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
              // make shape ( N.B. edge view not visible )
              textMesh = new global.THREE.Mesh(geometry, textMaterial);
              textMesh.layers.set(1);
              group.add(textMesh);
          }
          // text.position.z = 0;
      });

      return group
  }


  // 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
  // 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈
  function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex) {
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let sign = (isTopOrRight) ? 1 : -1;
      // let dim = {models:{}, paths:{}}
      let add = 200 * scale * sign;
      let fontSize = 50 * scale;
      let extend = 20 * scale * sign;
      let offset = offsetIndex * 200 * scale * sign + 20 * scale * sign;
      // dim.layer = "red"
      let meshes = [];
      let labels = [];
      if (isHorizontal) {
          for (var key in points) {
              meshes.push(LineMesh([{ x: points[key].x, y: points[index].y + offset }, { x: points[key].x, y: points[index].y + add + offset + extend }], lineMaterial));
          }
          for (let i = 0; i < points.length - 1; i++) {
              meshes.push(LineMesh([{ x: points[i].x, y: points[index].y + add + offset }, { x: points[i + 1].x, y: points[index].y + add + offset }], lineMaterial));
              let value = valueScale * (Math.abs(points[i + 1].x - points[i].x));
              labels.push({
                  text: value.toFixed(0),
                  anchor: [(points[i].x + points[i + 1].x) / 2, points[index].y + add + offset + fontSize, 0],
                  rotation: 0,
                  fontSize: fontSize
              });
          }
      } else {
          for (var key in points) {
              meshes.push(LineMesh([{ x: points[index].x + offset, y: points[key].y }, { x: points[index].x + add + offset + extend, y: points[key].y }], lineMaterial));
          }
          for (let i = 0; i < points.length - 1; i++) {
              meshes.push(LineMesh([{ x: points[index].x + add + offset, y: points[i].y }, { x: points[index].x + add + offset, y: points[i + 1].y }], lineMaterial));
              let value = valueScale * (Math.abs(points[i + 1].y - points[i].y));
              labels.push({
                  text: value.toFixed(0),
                  anchor: [points[index].x + add + offset - fontSize, (points[i].y + points[i + 1].y) / 2, 0],
                  rotation: Math.PI / 2,
                  fontSize: fontSize
              });
          }
      }
      return { meshes, labels }
  }

  // locate is 0 to 1 relative point of welding line
  function weldingMark(weldingObject, locate, scale, distance, isUpper, isRight, isXReverse, isYReverse) {
      // let welding = {models:{}, paths:{},caption:{},layer:'red'}
      // const sc = scale
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let linelength = [];

      let fontSize = 50 * scale;
      let dummy;
      let totallength = 0;
      let point = {};
      let meshes = [];
      let labels = [];

      for (let i = 0; i < weldingObject.Line.length - 1; i++) {
          dummy = PointLength(weldingObject.Line[i], weldingObject.Line[i + 1]);
          totallength += dummy;
          linelength.push(totallength);
      }
      for (let i = 0; i < linelength.length; i++) {
          if (linelength[i] / totallength >= locate) {
              point['x'] = ((1 - locate) * weldingObject.Line[i].x + locate * weldingObject.Line[i + 1].x);
              point['y'] = ((1 - locate) * weldingObject.Line[i].y + locate * weldingObject.Line[i + 1].y);
              break;
          }
      }
      let xsign = isRight ? 1 : -1;
      let ysign = isUpper ? 1 : -1;
      let xsign2 = isXReverse ? - 1 : 1;
      let ysign2 = isYReverse ? -1 : 1;
      let point0 = { x: point.x, y: point.y };
      let point1 = { x: point0.x + (xsign * xsign2 * distance * 0.25), y: point0.y + (ysign * ysign2 * distance * 0.25) };
      let point2 = { x: point1.x + (xsign * distance * 0.75), y: point1.y + (ysign * distance * 0.75) };
      let point3 = { x: point2.x + (250), y: point2.y };
      meshes.push(LineMesh([point0, point1], lineMaterial));
      meshes.push(LineMesh([point1, point2], lineMaterial));
      meshes.push(LineMesh([point2, point3], lineMaterial));
      meshes.push(LineMesh([{ x: point.x + xsign * xsign2 * 30, y: point.y + ysign * ysign2 * 50 }, point0], lineMaterial));
      meshes.push(LineMesh([{ x: point.x + xsign * xsign2 * 50, y: point.y + ysign * ysign2 * 30 }, point0], lineMaterial));

      if (weldingObject.type === "FF") {
          meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y + (50) }, { x: point2.x + (100), y: point2.y - (50) }], lineMaterial));
          meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y + (50) }, { x: point2.x + (150), y: point2.y }], lineMaterial));
          meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y - (50) }, { x: point2.x + (150), y: point2.y }], lineMaterial));
      }
      // else if (weldingObject.type==="F"){
      //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
      //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] - (50)*sc],[point2[0] + (150)*sc,point2[1]])
      // }
      // else if (weldingObject.type==="K"){
      //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
      //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
      // }
      // else if (weldingObject.type==="V"){
      //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
      //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
      // }
      labels.push({
          text: weldingObject.value1.toFixed(0),
          anchor: [point2.x + 50, point2.y - 50, 0],
          rotation: 0,
          fontSize: fontSize
      });
      return { meshes, labels }
  }

  // import { LineToThree } from "../line/module";

  function SectionViewer(){
    this.addInput("sectionName","arr");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("diaDict","diaDict");
  }

  SectionViewer.prototype.onExecute = function() {
  };

  SectionViewer.prototype.on3DExecute = function() {
    let gridlist = this.getInputData(0); //["G1D1", "G1D2", "G1D10"];
    let sectionPointDict = this.getInputData(1);
    let diaDict = this.getInputData(2);
  //   let svgAll = { models: {} };
    let i = 0;
    let offset = 5000;
    for (let value of gridlist) {
      let sectionPoint = sectionPointDict[value].forward;
      let diaPoint = diaDict[value];
      let group = sectionView(value, sectionPoint, diaPoint);
      // for (let j in group){
      //     
      //     sceneAdder({layer:1, mesh:group[j]},"section" + value + j);
      // }
      group.position.set(i*offset,0,0);
      global.sceneAdder({layer:1, mesh:group},"section" + value);
      // // svgAll.models[value].origin = [i * offset, 0];
      i += 1;
    }
  };



  function TopViewer(){
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("hBracingDict","hBracingDict");
    this.addInput("diaDict","diaDict");
    this.addInput("vstiffDict","diaDict");
    this.addInput("gridPoint","gridPoint");
    this.addInput("initPoint","point");
    this.addInput("girderStation","girderStation");
  }

  TopViewer.prototype.onExecute = function() {
  };

  TopViewer.prototype.on3DExecute = function() {
    let offset = 5000;
    let group = topDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5),this.getInputData(6));
    // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
    group.position.set(0,-offset,0);
    global.sceneAdder({layer:1, mesh:group},"topView");
  };

  function GirderGeneralView1(){
    this.addInput("girderStation","girderStation");
    this.addInput("layerNumber","number");
  }

  GirderGeneralView1.prototype.onExecute = function() {
  };

  GirderGeneralView1.prototype.on3DExecute = function() {
    let group = GirderGeneralDraw1(this.getInputData(0),this.getInputData(1));
    global.sceneAdder({layer:this.getInputData(1), mesh:group},"GirderGeneralView1");
  };

  function GirderGeneralView2(){
    this.addInput("girderStation","girderStation");
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("layerNumber","number");
  }

  GirderGeneralView2.prototype.onExecute = function() {
  };

  GirderGeneralView2.prototype.on3DExecute = function() {
    let group = GirderGeneralDraw2(this.getInputData(0),this.getInputData(1),this.getInputData(2));
    global.sceneAdder({layer:this.getInputData(2), mesh:group},"GirderGeneralView2");
  };


  function SideViewer(){
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("hBracingDict","hBracingDict");
    this.addInput("diaDict","diaDict");
    this.addInput("vstiffDict","diaDict");
    this.addInput("gridPoint","gridPoint");
    this.addInput("initPoint","point");
  }

  SideViewer.prototype.onExecute = function() {
  };

  SideViewer.prototype.on3DExecute = function() {
    let offset = 15000;
    let group = sideDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5));
    // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
    group.position.set(0,-offset,0);
    global.sceneAdder({layer:1, mesh:group},"SideView");
  };

  function LineDraw(){
    this.addInput("masterLine","line");
    this.addInput("slaveLine","line");
  }

  LineDraw.prototype.onExecute = function() {
  };

  LineDraw.prototype.on3DExecute = function() {
    let group = LineDrawView(this.getInputData(0),this.getInputData(1));
    global.sceneAdder({layer:3, mesh:group},"LineView");
  };

  function LineSideDraw(){
    this.addInput("masterLine","line");
  }

  LineSideDraw.prototype.onExecute = function() {
  };

  LineSideDraw.prototype.on3DExecute = function() {
    let group = LineSideView(this.getInputData(0));
    global.sceneAdder({layer:4, mesh:group},"LineSideView");
  };

  function GirderLayoutDraw(){
    this.addInput("girderLayout","girderLayout");
  }

  GirderLayoutDraw.prototype.onExecute = function() {
  };

  GirderLayoutDraw.prototype.on3DExecute = function() {
    let group = GirderLayoutView(this.getInputData(0));
    global.sceneAdder({layer:3, mesh:group.plan},"GirderLayout");
    global.sceneAdder({layer:4, mesh:group.side},"GirderLayoutSide");
  };

  function partProperty(width, thickness, Dy, Dz, cos) {
      // cos는 수직부재 1, 수평부재 0
      const sin = Math.sqrt(1 - cos ** 2);
      let area = width * thickness;
      let Ioyy = width * thickness / 12 * ((width * cos) ** 2 + (thickness * sin) ** 2);
      let Iozz = width * thickness / 12 * ((width * sin) ** 2 + (thickness * cos) ** 2);
      return { area, Ioyy, Iozz, Dy, Dz }
  }

  //I형 가로보의 시공단계별 단면계수 생성
  function Isection(xi, materials, slab) {

      let stage1 = {};
      let stage2 = {};
      let stage3 = {};
      let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
      let isteel = [];
      let tfw = xi[0];
      let tft = xi[1];
      let bfw = xi[2];
      let bft = xi[3];
      let wh = xi[4];
      let wt = xi[5];
      isteel.push(partProperty(tfw, tft, wh / 2 + tft / 2, 0, 0));
      isteel.push(partProperty(bfw, bft, -wh / 2 - bft / 2, 0, 0));
      isteel.push(partProperty(wh, wt, 0, 0, 1));

      //합성전 강재 단면
      let ADy = 0;
      let ADz = 0;

      stage1.A = 0;
      for (let i in isteel) {
          stage1.A += isteel[i].area;
          ADy += isteel[i].area * isteel[i].Dy;
          ADz += isteel[i].area * isteel[i].Dz;
      }
      stage1.Cy = ADy / stage1.A;
      stage1.Cz = ADz / stage1.A;
      stage1.Iyy = 0;
      stage1.Izz = 0;
      stage1.Ixx = 0;  // 추후 비틀림 강성에 대한 값을 계산하여야 함
      for (let i in isteel) {
          stage1.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage1.Cy) ** 2;
          stage1.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage1.Cz) ** 2;
      }
      // 단일 합성후 가로보단면 변화 없음
      stage2 = stage1;
      //이중합성후 합성단면의 단면계수 계산
      let deckConc = partProperty(slab.W / n1, slab.T, wh / 2 + slab.T / 2 + slab.Th, 0, 0);
      isteel.push(deckConc);
      ADy += deckConc.area * deckConc.Dy;
      ADz += deckConc.area * deckConc.Dz;
      stage3.A = stage2.A + deckConc.area;
      stage3.Cy = ADy / stage3.A;
      stage3.Cz = ADz / stage3.A;
      stage3.Iyy = 0;
      stage3.Izz = 0;
      stage3.Ixx = 0; // 추후 비틀림 강성에 대한 값을 계산하여야 함
      for (let i in isteel) {
          stage3.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage3.Cy) ** 2;
          stage3.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage3.Cz) ** 2;
      }

      return [stage1, stage2, stage3]
  }
  //이중합성 거더의 시공단계별 단면계수 생성
  function DCBsection(sa, materials) {
      let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
      let n2 = materials[2][1] / materials[1][1];  //하부콘크리트 탄성계수비
      let lcos = sa.H / Math.sqrt(sa.H ** 2 + ((sa.B2 - sa.B1) / 2) ** 2);
      let rcos = lcos;
      let sb = [];

      if (sa.isClosedTop) {
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, sa.B2 / 2, 0));
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, -sa.B2 / 2, 0));
      } else {
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, 0, 0));
      }
      sb.push(partProperty(sa.wlf, sa.tlf, -sa.H / 2 - sa.tlf / 2, 0, 0));
      sb.push(partProperty(sa.wlw, sa.tw, 0, -(sa.B2 + sa.B1) / 4, lcos));
      sb.push(partProperty(sa.wrw, sa.tw, 0, (sa.B2 + sa.B1) / 4, rcos));
      sa.Urib.layout.forEach(function (elem) {
          sb.push(partProperty(sa.Urib.height, sa.Urib.thickness, sa.H / 2 - sa.Urib.height / 2, elem, 1));
      });
      sa.Lrib.layout.forEach(function (elem) {
          sb.push(partProperty(sa.Lrib.height, sa.Lrib.thickness, -sa.H / 2 + sa.Lrib.height / 2, elem, 1));
      });
      let stage1 = {};
      let stage2 = {};
      let stage3 = {};

      //비틀림 강성 계산을 위한 수평브레이싱 등가 두께 계산

      if (sa.isClosedTop === false) {
          let hb = sa.horizontal_bracingbracing;
          let bracing_length = Math.Sqrt(hb.d0 ** 2 + sa.B2 ** 2);
          //tr = material.Steel.elast / material.Steel.shear_elast * .lamda * .B2 / (bracing_length ^ 3 / .horizontal_bracing.Area + 2 / 3 * .B2 / (.b_2 * .t2))
          let tr = materials[2][1] / materials[2][2] * hb.d0 * sa.B2 / (bracing_length ** 3 / hb.dbArea + 2 / 3 * sa.B2 / (sa.wuf * sa.tuf)); //<--- 임시로 작성
          stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / tr + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf);
      } else {
          stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / sa.tuf + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf);
      }
      //가로보 시공 후 또는 바닥판 타설후 비틀림 강성은 의미가 없으므로, 해석시에는 합성전후 거더의 비틀림강성이 동일하다고 가정한다.
      stage2.Ixx = stage1.Ixx;
      stage3.Ixx = stage1.Ixx;

      //합성전 강재 단면
      let ADy = 0;
      let ADz = 0;

      stage1.A = 0;
      for (let i in sb) {
          stage1.A += sb[i].area;
          ADy += sb[i].area * sb[i].Dy;
          ADz += sb[i].area * sb[i].Dz;
      }
      stage1.Cy = ADy / stage1.A;
      stage1.Cz = ADz / stage1.A;
      stage1.Iyy = 0;
      stage1.Izz = 0;
      for (let i in sb) {
          stage1.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage1.Cy) ** 2;
          stage1.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage1.Cz) ** 2;
      }

      //단일합성후 합성단면의 단면계수 계산
      let botConc = partProperty(sa.B1 / n2, sa.Tcl, -sa.H / 2 + sa.Tcl / 2, 0, 0);
      sb.push(botConc);
      if (sa.isDoubleComposite === false) {
          stage2 = stage1;
      } else {
          ADy += botConc.area * botConc.Dy;
          ADz += botConc.area * botConc.Dz;
          stage2.A = stage1.A + botConc.area;
          stage2.Cy = ADy / stage2.A;
          stage2.Cz = ADz / stage2.A;
          stage2.Iyy = 0;
          stage2.Izz = 0;
          for (let i in sb) {
              stage2.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage2.Cy) ** 2;
              stage2.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage2.Cz) ** 2;
          }
      }
      //이중합성후 합성단면의 단면계수 계산
      let deckConc = partProperty(sa.B3 / n1, sa.Tcu, sa.H / 2 + sa.Tcu / 2 + sa.Th, 0, 0);
      sb.push(deckConc);
      ADy += deckConc.area * deckConc.Dy;
      ADz += deckConc.area * deckConc.Dz;
      stage3.A = stage2.A + deckConc.area;
      stage3.Cy = ADy / stage3.A;
      stage3.Cz = ADz / stage3.A;
      stage3.Iyy = 0;
      stage3.Izz = 0;
      for (let i in sb) {
          stage3.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage3.Cy) ** 2;
          stage3.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage3.Cz) ** 2;
      }
      return [stage1, stage2, stage3]
  }

  function SupportGenerator(supportFixed, supportData, gridPoint) {
      let support = {};
      let girderHeight = 2000;    //임시로 2000이라고 가정함. 추후 girderSection정보로부터 받아올수 있도록 함.
      let fixedPoint = [];
      let isFixed = false;
      let angle = 0;
      let sign = 1;
      let type = "";
      let name = "";
      let point = {};
      const dof = {
          고정단: [true, true, true, false, false, false],
          양방향단: [false, false, true, false, false, false],
          횡방향가동: [true, false, true, false, false, false],
          종방향가동: [false, true, true, false, false, false],
      };
      let fixedCoord = { x: 0, y: 0, z: 0 };
      // 고정단기준이 체크되지 않거나, 고정단이 없을 경우에는 접선방향으로 받침을 계산함
      if (supportFixed) {
          fixedPoint = supportData.filter(function (value) { return value[1] == '고정단' });
      }
      if (fixedPoint.length > 0) {
          isFixed = true;
          let fixed = gridPoint[fixedPoint[0].point];
          let skew = fixed.skew * Math.PI / 180;
          let offset = fixedPoint[0].offset;
          fixedCoord = {
              x: fixed.x - (Math.cos(skew) * (-1) * fixed.normalSin - Math.sin(skew) * fixed.normalCos) * offset,
              y: fixed.y - (Math.sin(skew) * (-1) * fixed.normalSin + Math.cos(skew) * fixed.normalCos) * offset,
              z: fixed.z - girderHeight
          };
      }

      for (let index in supportData) {
          name = supportData[index][0]; //.point
          type = supportData[index][1]; //.type
          let offset = supportData[index][2]; //.offset
          point = gridPoint[name];
          console.log(name, point);
          let skew = point.skew * Math.PI / 180;
          let newPoint = {
              x: point.x - (Math.cos(skew) * (-1) * point.normalSin - Math.sin(skew) * point.normalCos) * offset,
              y: point.y - (Math.sin(skew) * (-1) * point.normalSin + Math.cos(skew) * point.normalCos) * offset,
              z: point.z - girderHeight
          };
          if (isFixed && name !== fixedPoint[0].point) {

              if (name.slice(2) === fixedPoint[0].point.slice(2)) {
                  angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x) * 180 / Math.PI + 90;
              } else {
                  angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x) * 180 / Math.PI;
              }
          } else {
              sign = point.normalCos >= 0 ? 1 : -1;
              angle = sign * Math.acos(-point.normalSin) * 180 / Math.PI;
          }
          support[index] = {
              angle: angle > 90 ? angle - 180 : angle < -90 ? angle + 180 : angle,
              point: newPoint,
              basePointName: name,
              key: "SPPT" + index,
              type: dof[type], //[x,y,z,rx,ry,rz]
          };
      }
      return support

  }
  /**
  <summary>
  각 요소별 포함하고 있는 노드의 리스트를 출력 및 sap.s2k 인풋결과 출력을 하며, 동시에 받침점에 대한 Local angle을 정의함
  </summary>
  <param name="girder_point_dict"></param>
  <param name="xbeam_info"></param>
  <param name="stringer_info"></param>
  <returns></returns>
  **/
  function SapJointGenerator(girderStation, supportNode, xbeamData) {//girder_layout, girder_point_dict, xbeam_info, stringer_info, support_data, all_beam_Section_info){
      let nodeNum = 1;
      let node = { command: "JOINT", data: [] };
      let local = { command: "LOCAL", data: [] };
      let boundary = { command: "RESTRAINT", data: [] };
      let rigid = { command: "CONSTRAINT", data: [] };
      let nodeNumDict = {};
      let dummycoord = [-1, -1, -1];

      for (let i in girderStation) {
          for (let j in girderStation[i]) {

              nodeNumDict[girderStation[i][j].key] = nodeNum;
              if (dummycoord[0] !== girderStation[i][j].point.x ||
                  dummycoord[1] !== girderStation[i][j].point.y ||
                  dummycoord[2] !== girderStation[i][j].point.z) {
                  node.data.push({ nodeNum: nodeNum, coord: [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z] });
                  nodeNum++;
                  dummycoord = [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z];
              }
          }
      }
      // let supportNode = SupportGenerator(supportFixed, supportData, gridPoint) // <-- 추후 함수 밖으로 보내야함
      for (let i in supportNode) {
          node.data.push({ nodeNum: nodeNum, coord: [supportNode[i].point.x, supportNode[i].point.y, supportNode[i].point.z] });
          nodeNumDict[supportNode[i].key] = nodeNum;
          local.data.push({ nodeNum: nodeNum, ANG: supportNode[i].angle });
          boundary.data.push({ nodeNum: nodeNum, DOF: supportNode[i].type });
          // rigid.data.push({ master: nodeNumDict[supportNode[i].basePointName], 
          //     slave: [nodeNumDict[supportNode[i].key]] }) //해당 결과가 sap에서 에러가 없는지 확인필요함.
          nodeNum++;
      }
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe) {
              for (let j in xbeamData[i].data) {
                  node.data.push({ nodeNum: nodeNum, coord: [xbeamData[i].data[j].x, xbeamData[i].data[j].y, xbeamData[i].data[j].z] });
                  nodeNumDict[xbeamData[i].key + "P" + j] = nodeNum;
                  nodeNum++;
              }
              rigid.data.push({ master: nodeNumDict[xbeamData[i].inode], slave: [nodeNumDict[xbeamData[i].key + "P0"], nodeNumDict[xbeamData[i].key + "P3"]] });
              rigid.data.push({ master: nodeNumDict[xbeamData[i].jnode], slave: [nodeNumDict[xbeamData[i].key + "P1"], nodeNumDict[xbeamData[i].key + "P2"]] });
          }
      }
      // xbeam stringer에 대한 절점 추가 입력 필요
      // stringerLayout input 추가 필요
      return { nodeNumDict, input: { node, local, boundary, rigid } }
  }
  // 합성전단계에 대해서 일단 우선 생성
  // stringer/외측빔에 대한 단면정보 생성은 추후 결정
  function AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData) {
      let sectionPropDict = {};
      for (let i in girderStation) {
          for (let j in girderStation[i]) {
              let key = girderStation[i][j].key;
              let sa = sectionPointDict[key].forward.input;
              let sa2 = sectionPointDict[key].backward.input;
              sectionPropDict[key] = { forward: {}, backward: {} };
              sectionPropDict[key].forward = DCBsection(sa, materials);
              sectionPropDict[key].backward = DCBsection(sa2, materials);
          }
      }
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe === false) {
              let slab = { W: 2000, T: 270, Th: 0 }; //추후 자동으로 계산되어야 함 20.04.01 by dr.lim
              let key = xbeamData[i].key;
              sectionPropDict[key] = Isection(xbeamData[i].section, materials, slab);
          }
      }
      return sectionPropDict;
  }
  function SectionCompare(section1, section2) {
      let result = true;
      result = section1.A === section2.A && section1.Ixx && section2.Ixx && section1.Iyy === section2.Iyy
          && section1.Izz === section2.Izz ? true : false;
      return result
  }
  function SapFrameGenerator(girderStation, sectionPointDict, xbeamData, supportNode, nodeNumDict, materials, sectionDB) {//consStep, all_material, girder_section_info, all_beam_section_info){
      let step = 0;
      let allElement = []; // As New List(Of Element_3d)
      let elemNum = 1; // As Integer = 1
      // let sectionNameDict = {}
      let material = { command: "MATERIAL", data: [] };
      for (let i in materials) {
          material.data.push({
              NAME: materials[i][0],
              IDES: "C", // 강재는 S, concrte C
              M: materials[i][4] / 9.81 / 1000,  // ton to kN <-- 추후 수정필요
              W: materials[i][4] / 1000, // ton to kg
              E: materials[i][1] * 1,
              U: materials[i][3] * 1
          });
      }

      let sectionPropDict = AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData);
      let selfWeight = { command: "LOAD", type: "Distributed Span", Name: "StBox", data: [] };
      let sectionNum = 1;
      let tsectionNum = 1;
      let generalSectionList = [];
      let taperedSectionList = [];
      for (let i in girderStation) {
          let tempSection = { name: "temp", A: 0, Ixx: 0, Iyy: 0, Izz: 0 };
          for (let j = 0; j < girderStation[i].length - 1; j++) {
              let inode = girderStation[i][j].key;
              let jnode = girderStation[i][j + 1].key;
              if (nodeNumDict[inode] !== nodeNumDict[jnode]) {
                  let sectionName = "noname"; // 임시로 작성 추후 수정 바람.
                  let section1 = sectionPropDict[inode].forward[step];
                  let section2 = sectionPropDict[jnode].backward[step];
                  if (SectionCompare(tempSection, section1)) {
                      if (SectionCompare(section1, section2)) {
                          sectionName = tempSection.name;
                          section2["name"] = sectionName;
                      }
                      else {
                          sectionName = "t" + tsectionNum;
                          tsectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx });
                          section2["name"] = sectionNum;
                          taperedSectionList.push({
                              Name: sectionName,
                              type: "Nonpr",
                              Sec: [tempSection.name, sectionNum],  //isection, jsection
                              Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                              Vl: 1
                          });
                          sectionNum++;
                      }
                  }
                  else {
                      if (SectionCompare(section1, section2)) {
                          sectionName = sectionNum;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
                          section2["name"] = sectionNum;
                          sectionNum++;
                      } else {
                          sectionName = "t" + tsectionNum;
                          tsectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
                          sectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx });
                          taperedSectionList.push({
                              Name: sectionName,
                              type: "Nonpr",
                              Sec: [sectionNum - 1, sectionNum],  //isection, jsection
                              Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                              Vl: 1
                          });
                          section2["name"] = sectionNum;
                          sectionNum++;
                      }

                  }
                  tempSection = section2;
                  // sectionNameDict[sectionName] = [sectionPropDict[inode].forward, sectionPropDict[jnode].backward]
                  let elem = {
                      iNode: nodeNumDict[inode],
                      jNode: nodeNumDict[jnode],
                      sectionName: sectionName, // node_group.Key & added_index,
                      endOffset: false,
                      number: elemNum
                  };
                  allElement.push(elem);
                  let p1 = -1 * section1.A * material.data[2].W;   //materials : steel
                  let p2 = -1 * section2.A * material.data[2].W;   //materials : steel
                  selfWeight.data.push({ elem: elemNum, RD: [0, 1], Uzp: [p1, p2] });
                  elemNum++;
              }
          }
      }
      let DBSectionList = [];
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[], section:[상형,하현,사재]}];
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe) {
              let KLink = [[0, 1], [2, 4], [3, 4], [0, 4], [1, 4]]; // 상현, 하현1, 하현2, 사재1, 사재2
              xbeamData[i].section.forEach(function (elem) {
                  if (DBSectionList.includes(elem) === false) {
                      DBSectionList.push(elem);
                  }
              });
              let sectionName = [xbeamData[i].section[0], xbeamData[i].section[1], xbeamData[i].section[1], xbeamData[i].section[2], xbeamData[i].section[2]];
              for (let j = 0; j < 5; j++) {
                  let inode = xbeamData[i].key + "P" + KLink[j][0];
                  let jnode = xbeamData[i].key + "P" + KLink[j][1];
                  let elem = {
                      iNode: nodeNumDict[inode],
                      jNode: nodeNumDict[jnode],
                      sectionName: sectionName[j], // node_group.Key & added_index,
                      endOffset: false,
                      number: elemNum
                  };
                  allElement.push(elem);
                  elemNum++;
              }
          } else {
              let sectionName = xbeamData[i].key; // 임시로 작성 추후 수정 바람.
              let section1 = sectionPropDict[xbeamData[i].key][step];
              generalSectionList.push({ NAME: sectionName, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
              // sectionNameDict[sectionName] = [sectionPropDict[sectionName]]  //가로보는 변단면 반영하지 않음.
              let elem = {
                  iNode: nodeNumDict[xbeamData[i].inode],
                  jNode: nodeNumDict[xbeamData[i].jnode],
                  sectionName: sectionName, // node_group.Key & added_index,
                  endOffset: true,
                  number: elemNum,
                  IOFF: xbeamData[i].data[0],
                  JOFF: xbeamData[i].data[1]
              };
              allElement.push(elem);
              elemNum++;
          }
      }

      DBSectionList.forEach(function (elem) {
          let section1 = sectionDB[elem];
          generalSectionList.push({ NAME: elem, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
      });

      generalSectionList.push({ NAME: "rigid", Mat: materials[2][0], A: 1000000000, I: [10000000000, 10000000000], J: 10000000000 });

      for (let i in supportNode) {
          let elem = {
              iNode: nodeNumDict[supportNode[i].basePointName],
              jNode: nodeNumDict[supportNode[i].key],
              sectionName: "rigid", // node_group.Key & added_index,
              endOffset: false,
              number: elemNum,
          };
          allElement.push(elem);
          elemNum++;
      }

      // deck, stringer  추후 작성
      // sectionDB운용방안 마련
      //    const materials = {
      //     slabConc: { name: "slabConc", elast: 28825.3, shearElast: 12318.5, poissonRatio: 0.17 w : 25}, // 강도와 재료 입력으로 자동생성
      //     bottomConc: { name: "lowerConc", elast: 31209.5, shearElast: 13337.4, poissonRatio: 0.17 },
      //     Steel: { name: "steelBox", elast: 210000, shearElast: 81000, poissonRatio: 0.3 },
      //     rebar: { name: "rebar", elast: 200000, shearElast: 80000, poissonRatio: 0.3 },
      // }


      let frame = { command: "FRAME", data: allElement };
      let section = { command: "FRAME SECTION", data: { generalSectionList, taperedSectionList } };
      return { sectionPropDict, input: { frame, section, material, selfWeight } }
  }

  function Support() {
      this.addInput("supportFixed", "boolean");
      this.addInput("supportLayout", "arr");
      this.addInput("gridPoint", "gridPoint");
      this.addOutput("supportdata", "supportdata");
  }

  Support.prototype.onExecute = function () {
      const result = SupportGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result);
  };

  function SapJoint() {
      this.addInput("girderStation", "girderStation");
      this.addInput("supportData", "supportData");
      this.addInput("xbeamData", "xbeamData");
      this.addOutput("nodeNumDict", "nodeNumDict");
      this.addOutput("nodeInput", "nodeInput");
  }

  SapJoint.prototype.onExecute = function () {
      const result = SapJointGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result.nodeNumDict);
      this.setOutputData(1, result.input);
  };

  function SapFrame() {
      this.addInput("girderStation", "girderStation");
      this.addInput("sectionPointDict", "sectionPointDict");
      this.addInput("xbeamData", "xbeamData");
      this.addInput("supportData", "supportData");
      this.addInput("nodeNumDict", "nodeNumDict");
      this.addInput("materials", "arr");
      this.addInput("sectionDB", "sectionDB");
      this.addOutput("sectionPropDict", "sectionPropDict");
      this.addOutput("frameInput", "frameInput");
  }

  SapFrame.prototype.onExecute = function () {
      const result = SapFrameGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2),this.getInputData(3),this.getInputData(4),this.getInputData(5),this.getInputData(6));
      this.setOutputData(0, result.sectionPropDict);
      this.setOutputData(1, result.input);
  };

  function SectionDB() {
      this.addOutput("sectionDB", "sectionDB");
  }

  SectionDB.prototype.onExecute = function () {
      //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      const result = {
          "T150x150x6.5x9": { type: "T", shape: [150, 150, 6.5, 9], A: 2266.5, Ixx: 122669.3, Iyy: 4598193, Izz: 2534477, Cy: 75, Cz: 34.8276 },
          "L100x100x10": { type: "L", shape: [100, 100, 10, 10], A: 1900, Ixx: 63300, Iyy: 1750000, Izz: 1750000, Cy: 28.2, Cz: 28.2 },
          "L150x150x12": { type: "L", shape: [150, 150, 12, 12], A: 3477, Ixx: 166000, Iyy: 7400000, Izz: 7400000, Cy: 41.4, Cz: 41.4 }
      };
      this.setOutputData(0, result);
  };

  function SplicePlate(iPoint, iSectionPoint) {
      let result = {};
      let iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[0]);
      let jNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1]);
      let centerPoint = {
        x: (iNode.x + jNode.x) / 2,
        y: (iNode.y + jNode.y) / 2,
        z: (iNode.z + jNode.z) / 2,
        normalCos: iPoint.normalCos,
        normalSin: iPoint.normalSin,
      };
      let Web = [{ x: -900, y: -250 }, { x: -900, y: 250 }, { x: 900, y: 250 }, { x: 900, y: -250 }];
      let WebBolt = [{ startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 },];
      let lWebAngle = Math.PI - Math.atan((iSectionPoint.lWeb[1].y - iSectionPoint.lWeb[0].y) / (iSectionPoint.lWeb[1].x - iSectionPoint.lWeb[0].x));
      let rWebAngle = Math.PI - Math.atan((iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y) / (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x));
      result["lWeb"] = {
        points: Web, point: centerPoint,
        Thickness: 20, z: 14, rotationX: 0, rotationY: lWebAngle, hole: [], bolt: WebBolt
      };
      result["lWeb2"] = {
        points: Web, point: centerPoint,
        Thickness: 20, z: -20, rotationX: 0, rotationY: lWebAngle, hole: []
      };
    
      iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[0]);
      jNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1]);
      centerPoint = {
        x: (iNode.x + jNode.x) / 2,
        y: (iNode.y + jNode.y) / 2,
        z: (iNode.z + jNode.z) / 2,
        normalCos: iPoint.normalCos,
        normalSin: iPoint.normalSin,
      };
      result["rWeb"] = {
        points: Web, point: centerPoint,
        Thickness: 20, z: 14, rotationX: 0, rotationY: rWebAngle, hole: [], bolt: WebBolt
      };
      result["rWeb2"] = {
        points: Web, point: centerPoint,
        Thickness: 20, z: -20, rotationX: 0, rotationY: rWebAngle, hole: []
      };
    
      iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1]);
      centerPoint = {
        ...iNode,
        normalCos: iPoint.normalCos,
        normalSin: iPoint.normalSin,
      };
      let TopFlange = [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }];
      let TopFlangeBolt = [{ startPoint: { x: 160, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 },
      { startPoint: { x: -80, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 }];
    
      result["lTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt };
      result["lTop2"] = {
        points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
        point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
      };
      result["lTop3"] = {
        points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
        point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
      };
    
      iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1]);
      centerPoint = {
        ...iNode,
        normalCos: iPoint.normalCos,
        normalSin: iPoint.normalSin,
      };
    
      result["rTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt };
      result["rTop2"] = {
        points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
        point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
      };
      result["rTop3"] = {
        points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
        point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
      };
    
    
      let BP = iSectionPoint.bottomPlate;
      iNode = ToGlobalPoint(iPoint, BP[0]);
      jNode = ToGlobalPoint(iPoint, BP[1]);
      centerPoint = {
        x: (iNode.x + jNode.x) / 2,
        y: (iNode.y + jNode.y) / 2,
        z: (iNode.z + jNode.z) / 2,
        normalCos: iPoint.normalCos,
        normalSin: iPoint.normalSin,
      };
      let bottomFlange = [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x, y: -250 }];
      let bottomFlangeBolt = [{ startPoint: { x: BP[0].x + 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
      { startPoint: { x: BP[1].x - 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
      { startPoint: { x: BP[1].x - 172, y: 150 }, P: 100, G: 140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 },
      { startPoint: { x: BP[0].x + 172, y: 150 }, P: 100, G: -140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 }];
    
      result["bottom1"] = {
        points: [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[0].x + 80, y: 250 }, { x: BP[0].x + 80, y: -250 }],
        point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: [], bolt: bottomFlangeBolt
      };
      result["bottom2"] = {
        points: [{ x: BP[1].x, y: -250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x - 80, y: 250 }, { x: BP[1].x - 80, y: -250 }],
        point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
      };
      result["bottom3"] = {
        points: [{ x: BP[0].x + 132, y: -250 }, { x: BP[0].x + 132, y: 250 }, { x: BP[1].x - 132, y: 250 }, { x: BP[1].x - 132, y: -250 }],
        point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
      };
      result["bottom4"] = {
        points: bottomFlange,
        point: centerPoint, Thickness: 20, z: -20 - 14, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
      };
      // result["bottom2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
      //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
      // result["bottom3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
      //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
    
      return result
    }

  function SplicePart() {
      this.addInput("spliceLayout","spliceLayout");
      this.addInput("spliceSectionList","spliceSectionList");
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addOutput("diaDict", "diaDict");
  }

  SplicePart.prototype.onExecute = function () {
      //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      let gridPoint = this.getInputData(2);    let sectionPointDict = this.getInputData(3);
      let spliceDict = {};
      for (let key in gridPoint) {
          if (key.includes("SP")) {
            spliceDict[key] = SplicePlate(gridPoint[key], sectionPointDict[key].forward);
          }
        }
      
      this.setOutputData(0, spliceDict);
  };

  function BarrierSectionPoint(
      masterLine,
      centerLineStations,
      slabInfo,
      slabLayout,
      pointDict
    ){
      // slabLayout object to list 
      const position = 0;
      const T = 1;
      // const leftOffset = 3;
      // const rightOffset =4;

      let leftBarrier = [];
      let rightBarrier = [];
      let slabThickness = slabInfo.slabThickness;
      let haunch = slabInfo.haunchHeight;
      let endT = 0;
      let leftOffset = 0;
      let rightOffset = 0;
      for (let i = 1; i < centerLineStations.length - 1; i++) {
        
        let masterPoint = centerLineStations[i].point;
        let masterStation = masterPoint.masterStationNumber;
        //deckSectionInfo로 분리예정
        for (let j = 0; j < slabLayout.length - 1; j++) {
          let ss = pointDict[slabLayout[j][position]].masterStationNumber;
          let es = pointDict[slabLayout[j + 1][position]].masterStationNumber;
          if (masterStation >= ss && masterStation <= es) {
            let x = masterStation - ss;
            let l = es - ss;
            leftOffset = slabLayout[j][3] * (l - x) / l + slabLayout[j + 1][3] * (x) / l;
            rightOffset = slabLayout[j][4] * (l - x) / l + slabLayout[j + 1][4] * (x) / l;
            // slabThickness = slabLayout[j].H * (l - x) / l + slabLayout[j + 1].H * (x) / l
            endT = slabLayout[j][T] * (l - x) / l + slabLayout[j + 1][T] * (x) / l;
          }
        }
        //deckSectionInfo로 분리예정
        for (let k = 0; k<2;k++){
          let offset = k===0? leftOffset:rightOffset;
          let sign = k ===0? 1:-1;
          let l1 = OffsetPoint(masterPoint, masterLine, offset + sign*10);
          let l2 = OffsetPoint(masterPoint, masterLine, offset + sign*250);
          let l3 = OffsetPoint(masterPoint, masterLine, offset + sign*320);
          let l4 = OffsetPoint(masterPoint, masterLine, offset + sign*450);
          let points = [ZMove(l4,slabThickness + haunch),
                              ZMove(l4,slabThickness + haunch + 200),
                              ZMove(l3,slabThickness + haunch + 380),
                              ZMove(l2,slabThickness + haunch + 1350),
                              ZMove(l1,slabThickness + haunch + 1350),
                              ZMove(l1,slabThickness + haunch),];
          if (k===0){
            leftBarrier.push({name:masterStation, points:points.reverse()}); // 추후 순서를 뒤집어서 작성 필요
          }else {
            rightBarrier.push({name:masterStation, points:points.reverse()});
          }
        }
      }
      // leftBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
      // rightBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
      return {leftBarrier, rightBarrier }
    }

  function BarrierPoint(){
      this.addInput("masterLine","line");
      this.addInput("centerLineStation","centerLineStation");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("pointDict","pointDict");
      this.addOutput("BarrierPointDict","DeckPointDict");
    }

    BarrierPoint.prototype.onExecute = function(){
      this.setOutputData(0,BarrierSectionPoint(
          this.getInputData(0),
          this.getInputData(1),
          this.getInputData(2),
          this.getInputData(3),
          this.getInputData(4)
        ));
    };

  function DeckRebarPoint(
      masterLine,
      pointDict,
      deckSection,
      slabInfo,
      slabLayout,
      rebar1,
      rebar2,
      rebar11
  ) {
      let type = 1;
      let Var = 2;
      let leftCover = 3;
      let rightCover = 4;
      let isUpper = 5;
      let cover = 6;
      let spacing = 7;
      let start = 10;
      let end = 11;
      let startOffset = 12;
      let endOffset = 13;

      let r1 = [];
      let r2 = [];
      for (let rNum in rebar1) {
          let left1 = {};
          let right1 = {};
          let sp = pointDict[rebar1[rNum][start]];
          let ep = pointDict[rebar1[rNum][end]];
          let station = sp.masterStationNumber + rebar1[rNum][startOffset];
          let zOffset = slabInfo.slabThickness + slabInfo.haunchHeight;
          while (station <= ep.masterStationNumber + rebar1[rNum][endOffset]) {
              let mp1 = MasterPointGenerator(station, masterLine);
              // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);

              for (let i = 0; i < slabLayout.length - 1; i++) {
                  let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                  let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
                  if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                      let x = mp1.masterStationNumber - ss;
                      let l = es - ss;
                      let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                      let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                      let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
                      let z = rebar1[rNum][isUpper] ? zOffset - rebar1[rNum][cover] : zOffset - slabThickness + rebar1[rNum][cover];
                      left1 = OffsetPoint(mp1, masterLine, leftOffset + rebar1[rNum][leftCover]);
                      right1 = OffsetPoint(mp1, masterLine, rightOffset - rebar1[rNum][rightCover]);
                      if (rebar1[rNum][type] === "C") {
                          r1.push([ZMove(left1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                          ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),
                          ZMove(right1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                          ]);
                      } else {
                          r1.push([ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),]);
                      }
                      break;
                  }
              }
              station += rebar1[rNum][spacing];
              //   iter ++;
              //   if (iter>100){break;}
          }
      }

      let tSlab = [];
      let bSlab = [];
      deckSection.forEach(function(elem){
          tSlab.push({name : elem.name, points : elem.slabUpperPoints});
          bSlab.push({name : elem.name, points : elem.slabLowerPoints});
      });

      for (let rNum in rebar2) {
          let bPts = [];
          let lrebar = [];
          let slabLine = rebar2[rNum][isUpper] ? tSlab : bSlab;
          let sp = pointDict[rebar2[rNum][start]].masterStationNumber;
          let ep = pointDict[rebar2[rNum][end]].masterStationNumber;
          let cov = rebar2[rNum][isUpper] ? -rebar2[rNum][cover] : rebar2[rNum][cover];
          slabLine.forEach(function (elem) {
              if (elem.name >= sp && elem.name <= ep) {
                  bPts.push(ZOffsetLine(elem.points, cov));
              }
          });

          // console.log(ZOffsetLine(deckSection.slab2[18].points,70))
          let iMax = bPts.length - 1;
          let spt = longiRebarEndPoints(bPts[0], bPts[1], rebar2[rNum][startOffset], true);
          let ept = longiRebarEndPoints(bPts[iMax - 1], bPts[iMax], rebar2[rNum][endOffset], false);
          lrebar.push(InterPolation2(spt, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));
          for (let i = 1; i < iMax; i++) {
              lrebar.push(InterPolation2(bPts[i], rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));
          }
          lrebar.push(InterPolation2(ept, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));

          for (let i = 0; i < lrebar[0].length; i++) {
              let pts = [];
              for (let j = 0; j < lrebar.length; j++) {
                  pts.push(lrebar[j][i]);
              }
              r2.push(pts);
          }
      }


      let isLeft = 3;
      let isRight = 4;
      spacing = 5;
      start = 8;
      end = 9;
      startOffset = 10;
      endOffset = 11;


      for (let rNum in rebar11) {
          let sp = pointDict[rebar11[rNum][start]];
          let ep = pointDict[rebar11[rNum][end]];
          let station = sp.masterStationNumber + rebar11[rNum][startOffset];
          let zOffset = slabInfo.slabThickness + slabInfo.haunchHeight;
          while (station <= ep.masterStationNumber + rebar11[rNum][endOffset]) {
              let mp1 = MasterPointGenerator(station, masterLine);
              // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);
              for (let i = 0; i < slabLayout.length - 1; i++) {
                  let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                  let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
                  if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                      let x = mp1.masterStationNumber - ss;
                      let l = es - ss;
                      let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                      let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                      let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
                      let endT = slabLayout[i][1] * (l - x) / l + slabLayout[i + 1][1] * (x) / l;
                      if (rebar11[rNum][isLeft]) {
                          let rebarPts = [];
                          let offset = 0;
                          for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                              offset += rebar11[rNum][Var][j];
                              rebarPts.push(OffsetPoint(mp1, masterLine, leftOffset + offset));
                          }
                          r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])]);
                      }
                      if (rebar11[rNum][isRight]) {
                          let rebarPts = [];
                          let offset = 0;
                          for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                              offset += rebar11[rNum][Var][j];
                              rebarPts.push(OffsetPoint(mp1, masterLine, rightOffset - offset));
                          }
                          r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])]);
                      }
                  }
              }
              station += rebar1[rNum].spacing;
          }
      }


      return { r1, r2, }
  }

  //   export function InterPolation(point1, point2, spacing) {
  //     let result = [];
  //     let length = Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
  //     let remainder = length % spacing
  //     let x = 0
  //     for (let i = 0; i < length / spacing; i++) {
  //       result.push({
  //         x: point1.x * (length - x) / length + point2.x * x / length,
  //         y: point1.y * (length - x) / length + point2.y * x / length,
  //         z: point1.z * (length - x) / length + point2.z * x / length
  //       })
  //       x = remainder > 0 && i === 1 ? x + remainder / 2 + spacing / 2 : x + spacing;
  //       result.push(point2)
  //     }

  //     return result
  //   }

  function InterPolation2(points, spacing, leftCover, rightCover, variables) {
      let result = [];
      let distanceList = [0];
      let accLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
          let l = Math.sqrt((points[i + 1].x - points[i].x) ** 2 + (points[i + 1].y - points[i].y) ** 2);
          accLength += l;
          distanceList.push(accLength);
      }

      let W = (accLength - leftCover - rightCover);
      let remainder = W % spacing;

      let x = leftCover;
      for (let i = 0; i < W / spacing + 1; i++) {
          if (variables == false || variables.length === 0 || x <= leftCover + variables[0] || x >= leftCover + W - variables[1]) {
              for (let j = 0; j < distanceList.length - 1; j++) {
                  if (x >= distanceList[j] && x <= distanceList[j + 1]) {
                      let segX = x - distanceList[j];
                      let segL = distanceList[j + 1] - distanceList[j];
                      result.push({
                          x: points[j].x * (segL - segX) / segL + points[j + 1].x * segX / segL,
                          y: points[j].y * (segL - segX) / segL + points[j + 1].y * segX / segL,
                          z: points[j].z * (segL - segX) / segL + points[j + 1].z * segX / segL
                      });
                      break;
                  }
              }
          }
          x = remainder > 0 && (i === 0 || i === Math.floor(W / spacing)) ? x + remainder / 2 + spacing / 2 : x + spacing;
          // result.push(points[points.length-1])
      }
      return result
  }

  function longiRebarEndPoints(startPoints, endPoints, Offset, isStart) {
      let result = [];
      for (let i in startPoints) {

          let segL = Math.sqrt((endPoints[i].x - startPoints[i].x) ** 2 + (endPoints[i].y - startPoints[i].y) ** 2);
          let segX = isStart ? Offset : segL + Offset;
          result.push({
              x: startPoints[i].x * (segL - segX) / segL + endPoints[i].x * segX / segL,
              y: startPoints[i].y * (segL - segX) / segL + endPoints[i].y * segX / segL,
              z: startPoints[i].z * (segL - segX) / segL + endPoints[i].z * segX / segL
          });
      }

      return result
  }

  function DeckRebar() {
      this.addInput("masterLine","masterLine");
      this.addInput("gridPoint","gridPoint");
      this.addInput("deckPointDict","deckPointDict");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("rebar1","arr");
      this.addInput("rebar2","arr");
      this.addInput("rebar11","arr");
      this.addOutput("deckRebar", "deckRebar");
  }

  DeckRebar.prototype.onExecute = function () {
      let masterLine = this.getInputData(0);
      let pointDict = this.getInputData(1);
      let deckSection = this.getInputData(2);
      let slabInfo = this.getInputData(3);
      let slabLayout = this.getInputData(4);
      let rebar1 = this.getInputData(5);
      let rebar2 = this.getInputData(6);
      let rebar11  = this.getInputData(7);         

      
      this.setOutputData(0, DeckRebarPoint(
          masterLine,
          pointDict,  
          deckSection,
          slabInfo,
          slabLayout,
          rebar1,
          rebar2,
          rebar11
      ));
  };

  // stud의 각 위치좌표를 생성하는 함수
  function StudPoint(girderStation, sectionPointDict, topPlateStudLayout) {
      //1차적으로는 station을 기준으로 배치하고 향후 옵션(곡선교에 대한)을 추가해서, 실간격을 반영할지 여부를 판단할 것임.
      // const topPlateStudLayout = [{
      //     start : "G1K1",
      //     end : "G1SP1",
      //     startOffset : 200,
      //     endOffset : 200,
      //     spacing : 450,

      //     outSideMargin : 100,
      //     inSideMargin : 100,
      //     minNum : 3, //개구부에서부터 간격이 고정되는 스터드의 개수를 의미함
      //     maxNum : 5,
      //     maxDist : 435   //
      // }]

      const studInfo = {
          dia: 25,
          height: 150,
          headDia: 38,
          headDepth: 10,
      };

      let studList = [];
      for (let i in topPlateStudLayout) {
          let ts = {
              start: topPlateStudLayout[i][0],
              end: topPlateStudLayout[i][1],
              startOffset: topPlateStudLayout[i][2],
              endOffset: topPlateStudLayout[i][3],
              spacing: topPlateStudLayout[i][4],
              outSideMargin: topPlateStudLayout[i][5],
              inSideMargin: topPlateStudLayout[i][6],
              minNum: topPlateStudLayout[i][7],
              maxNum: topPlateStudLayout[i][8],
              minDist: 100,  //라이트그래프 인풋변수 수정 필요
              maxDist: topPlateStudLayout[i][9]
          };

          const sp = ts.start;
          let girderIndex = sp.substr(1, 1) * 1 - 1;
          let gridKeys = [];
          let gridPoints = [];
          let cr = false;

          for (let j in girderStation[girderIndex]) {
              if (girderStation[girderIndex][j].key === ts.start) {
                  cr = true;
              }
              if (cr) {
                  gridKeys.push(girderStation[girderIndex][j].key);
                  gridPoints.push(girderStation[girderIndex][j].point);
              }
              if ((girderStation[girderIndex][j].key === ts.end)) {
                  cr = false;
              }
          }
          let totalLength = 0;
          let segLength = 0;
          for (let j = 0; j < gridKeys.length - 1; j++) {
              let points = [];
              let leftinode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[3];
              let leftjnode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[2];
              let rightinode = sectionPointDict[gridKeys[j]].forward.rightTopPlate[3];
              let rightjnode = sectionPointDict[gridKeys[j]].forward.rightTopPlate[2];
              let leftinode2 = sectionPointDict[gridKeys[j + 1]].backward.leftTopPlate[3];
              let rightinode2 = sectionPointDict[gridKeys[j + 1]].backward.rightTopPlate[3];

              let spts = [];
              let epts = [];
              for (let k = 0; k < ts.minNum; k++) {
                  spts.push({ x: leftinode.x + ts.outSideMargin + k * ts.minDist, y: leftinode.y + (ts.outSideMargin + k * ts.minDist) * gridPoints[j].gradientY });
                  spts.push({ x: rightinode.x - ts.outSideMargin - k * ts.minDist, y: rightinode.y - (ts.outSideMargin + k * ts.minDist) * gridPoints[j].gradientY });
                  epts.push({ x: leftinode2.x + ts.outSideMargin + k * ts.minDist, y: leftinode2.y + (ts.outSideMargin + k * ts.minDist) * gridPoints[j + 1].gradientY });
                  epts.push({ x: rightinode2.x - ts.outSideMargin - k * ts.minDist, y: rightinode2.y - (ts.outSideMargin + k * ts.minDist) * gridPoints[j + 1].gradientY });
              }
              let globalSpts = [];
              let globalEpts = [];
              spts.forEach(function (elem) { globalSpts.push(ToGlobalPoint(gridPoints[j], elem)); });
              epts.forEach(function (elem) { globalEpts.push(ToGlobalPoint(gridPoints[j + 1], elem)); });
              segLength = Math.sqrt((globalSpts[0].x - globalEpts[0].x) ** 2 + (globalSpts[0].y - globalEpts[0].y) ** 2);
              totalLength += segLength;
              let remainder = (totalLength - ts.startOffset) % ts.spacing;
              let sNum = segLength - remainder > 0 ? Math.floor((segLength - remainder) / ts.spacing) + 1 : 0;

              for (let l = 0; l < spts.length; l++) {
                  for (let k = 0; k < sNum; k++) {
                      let x = 0;
                      if (j < gridKeys.length - 2 || k > 0) {
                          x = remainder + k * ts.spacing;
                      } else {
                          x = ts.endOffset;
                      }
                      points.push({
                          x: x / segLength * globalSpts[l].x + (segLength - x) / segLength * globalEpts[l].x,
                          y: x / segLength * globalSpts[l].y + (segLength - x) / segLength * globalEpts[l].y,
                          z: x / segLength * globalSpts[l].z + (segLength - x) / segLength * globalEpts[l].z
                      });

                  }
              }

              studList.push({ points: points, gradientX: 0, gradientY: gridPoints[j].gradientY, stud: studInfo });
              // sectionPointDict[gridKeys[j]].backward.leftTopPlate[3]
          }



      }


      return studList
  }

  function Stud(){
      this.addInput("girderStation","girderStation");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("studLayout","arr");
      this.addOutput("studList","studList");
    }
    
    Stud.prototype.onExecute = function() {
      const result = StudPoint(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result);
    };

  // import { defaultValues } from "./defaultValues";

  global.LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
  global.LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
  global.LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
  global.LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
  global.LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
  global.LiteGraph.registerNodeType("nexivil/DeckPoint", DeckPoint);
  global.LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);
  global.LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
  global.LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);
  global.LiteGraph.registerNodeType("HMECS/hBracing", HBracing);
  global.LiteGraph.registerNodeType("HMECS/xbeam", Xbeam);
  global.LiteGraph.registerNodeType("nexivil/support",Support);
  global.LiteGraph.registerNodeType("nexivil/sapJoint",SapJoint);
  global.LiteGraph.registerNodeType("nexivil/sapFrame",SapFrame);
  global.LiteGraph.registerNodeType("nexivil/SectionDB",SectionDB);
  global.LiteGraph.registerNodeType("HMECS/splice", SplicePart);
  global.LiteGraph.registerNodeType("HMECS/barrier", BarrierPoint);
  global.LiteGraph.registerNodeType("HMECS/DeckRebar", DeckRebar);
  global.LiteGraph.registerNodeType("HMECS/Stud", Stud);


  global.LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
  global.LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
  global.LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
  global.LiteGraph.registerNodeType("3DVIEW/HorBracingView", HorBracingView);
  global.LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);
  global.LiteGraph.registerNodeType("3DVIEW/deckView", DeckView);
  global.LiteGraph.registerNodeType("3DVIEW/BarrierView", BarrierView);
  global.LiteGraph.registerNodeType("3DVIEW/SpliceBoltView", SpliceBoltView);
  global.LiteGraph.registerNodeType("3DVIEW/RebarView", RebarView);
  global.LiteGraph.registerNodeType("3DVIEW/StudView", StudView);
  global.LiteGraph.registerNodeType("3DVIEW/AnalysisView", AnalysisView);

  global.LiteGraph.registerNodeType("Drawing/SectionView", SectionViewer );
  global.LiteGraph.registerNodeType("Drawing/TopView", TopViewer );
  global.LiteGraph.registerNodeType("Drawing/SideView", SideViewer );
  global.LiteGraph.registerNodeType("Drawing/LineDraw", LineDraw );
  global.LiteGraph.registerNodeType("Drawing/LineSideDraw", LineSideDraw );
  global.LiteGraph.registerNodeType("Drawing/GirderLayoutDraw", GirderLayoutDraw );
  global.LiteGraph.registerNodeType("Drawing/GirderGeneralView1", GirderGeneralView1 );
  global.LiteGraph.registerNodeType("Drawing/GirderGeneralView2", GirderGeneralView2 );


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
