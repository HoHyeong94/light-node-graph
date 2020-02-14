// ["horizon", "vertical", "superElevation" ,"girderLayoutInput", "SEShape", "girderBaseInfo" , "xbeamLayout", "xbeamSectionList", "diaphragmLayout", "diaphragmSectionList", "vStiffLayout", "vStiffSectionList", "hBracingLayout", "hBracingSectionList", ]

// 테스트용 ... 다른곳에서 건드리지 말것 ....
// 건드리더라도 read-only , 내부  값 바꾸지 말것 ...
// multiLineStringComp 에서 shallow copy 중

export const defaultValues = {
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
      { name: "시점", angle: 70, spanlength: 0 },
      { name: "A1", angle: 70, spanLength: 700 },
      { name: "P1", angle: 90, spanLength: 55000 },
      { name: "P2", angle: 90, spanLength: 55000 },
      { name: "P3", angle: 90, spanLength: 60000 },
      { name: "P4", angle: 90, spanLength: 60000 },
      { name: "P5", angle: 90, spanLength: 55000 },
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
      J: 470,
      S: 270,
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
      J: 470,
      S: 270,
      Taper: "parallel"
    }
  },

  girderBaseInfo: [
    {
      girderIndex: 0,
      section: {
        B: 1700,
        UL: 1050,
        UR: 1050,
        C: 200,
        D: 200,
        C1: 200,
        D1: 200,
        H: 2000
      },
      height: [
        //straight/circle/parabola
        {
          start: "G1K1",
          end: "G1C18",
          startH: 2000,
          endH: 2000,
          type: "straight"
        },
        {
          start: "G1C18",
          end: "G1C21",
          startH: 2000,
          endH: 2500,
          type: "circle"
        },
        {
          start: "G1C21",
          end: "G1C24",
          startH: 2500,
          endH: 2500,
          type: "straight"
        },
        {
          start: "G1C24",
          end: "G1C27",
          startH: 2500,
          endH: 2000,
          type: "circle"
        },
        {
          start: "G1C27",
          end: "G1S7",
          startH: 2000,
          endH: 2000,
          type: "straight"
        }
      ],
      slabThickness: [
        //straight/
        {
          start: "G1K1",
          end: "G1K2",
          startH: 470,
          endH: 470,
          type: "straight"
        },
        { start: "G1K2", end: "G1K3", startH: 470, endH: 270, type: "straight" }
      ],
      uFlange: [
        { start: "G1K1", end: "G1S7", thickness: 18, startW: 400, endW: 400 }
      ],
      lFlange: [{ start: "G1K1", end: "G1S7", thickness: 20 }],
      web: [{ start: "G1K1", end: "G1S7", thickness: 14 }],
      uRib: [
        {
          start: "G1K1",
          end: "G1S7",
          thickness: 14,
          height: 150,
          layout: [-200, 200]
        }
      ],
      lRib: [
        {
          start: "G1K1",
          end: "G1S7",
          thickness: 14,
          height: 150,
          layout: [-200, 200]
        }
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
        C1: 200,
        D1: 200,
        H: 2000
      },
      height: [
        //straight/circle/parabola
        {
          start: "G2K1",
          end: "G2C18",
          startH: 2000,
          endH: 2000,
          type: "straight"
        },
        {
          start: "G2C18",
          end: "G2C21",
          startH: 2000,
          endH: 2500,
          type: "circle"
        },
        {
          start: "G2C21",
          end: "G2C24",
          startH: 2500,
          endH: 2500,
          type: "straight"
        },
        {
          start: "G2C24",
          end: "G2C27",
          startH: 2500,
          endH: 2000,
          type: "circle"
        },
        {
          start: "G2C27",
          end: "G2S7",
          startH: 2000,
          endH: 2000,
          type: "straight"
        }
      ],
      slabThickness: [
        //straight/
        {
          start: "G2K1",
          end: "G2K2",
          startH: 470,
          endH: 470,
          type: "straight"
        },
        { start: "G2K2", end: "G2K3", startH: 470, endH: 270, type: "straight" }
      ],
      uFlange: [
        { start: "G2K1", end: "G2S7", thickness: 18, startW: 400, endW: 400 }
      ],
      lFlange: [{ start: "G2K1", end: "G2S7", thickness: 20 }],
      web: [{ start: "G2K1", end: "G2S7", thickness: 14 }],
      uRib: [
        {
          start: "G2K1",
          end: "G2S7",
          thickness: 14,
          height: 150,
          layout: [-200, 200]
        }
      ],
      lRib: [
        {
          start: "G2K1",
          end: "G2S7",
          thickness: 14,
          height: 150,
          layout: [-200, 200]
        }
      ]
    },
    // {
    //   girderIndex: 2,
    //   section: {
    //     B: 1700,
    //     UL: 1050,
    //     UR: 1050,
    //     C: 200,
    //     D: 200,
    //     C1: 200,
    //     D1: 200,
    //     H: 2000
    //   },
    //   height: [
    //     {
    //       start: "G3K1",
    //       end: "G3S7",
    //       startH: 2000,
    //       endH: 2000,
    //       type: "straight"
    //     }
    //   ],
    //   slabThickness: [
    //     //straight/
    //     {
    //       start: "G3K1",
    //       end: "G3K2",
    //       startH: 470,
    //       endH: 470,
    //       type: "straight"
    //     },
    //     { start: "G3K2", end: "G3K3", startH: 470, endH: 270, type: "straight" }
    //   ],
    //   uFlange: [
    //     { start: "G3K1", end: "G3S7", thickness: 18, startW: 400, endW: 400 }
    //   ],
    //   lFlange: [{ start: "G3K1", end: "G3S7", thickness: 30 }],
    //   web: [{ start: "G3K1", end: "G3S7", thickness: 14 }],
    //   uRib: [
    //     {
    //       start: "G3K1",
    //       end: "G3S7",
    //       thickness: 14,
    //       height: 150,
    //       layout: [-200, 200]
    //     }
    //   ],
    //   lRib: [
    //     {
    //       start: "G3K1",
    //       end: "G3S7",
    //       thickness: 14,
    //       height: 150,
    //       layout: [-200, 200]
    //     }
    //   ]
    // }
  ],

  xbeamLayout: [
    { iNode: "G1D5", jNode: "G2D6", section: "xbeamK" },
    { iNode: "G1D3", jNode: "G2D4", section: "xbeamK" },
    { iNode: "G1D1", jNode: "G2D2", section: "xbeamK" },
    { iNode: "G1D7", jNode: "G2D8", section: "xbeamK" },
    { iNode: "G1D9", jNode: "G2D10", section: "xbeamK" },
    { iNode: "G1S1", jNode: "G2S1", section: "xbeamI" },
    { iNode: "G1S2", jNode: "G2S2", section: "xbeamI" },
    { iNode: "G1S3", jNode: "G2S3", section: "xbeamI" },
    { iNode: "G1S4", jNode: "G2S4", section: "xbeamI" },
    { iNode: "G1S5", jNode: "G2S5", section: "xbeamI" },
    { iNode: "G1S6", jNode: "G2S6", section: "xbeamI" },
    { iNode: "G1S7", jNode: "G2S7", section: "xbeamI" }
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

    { position: "G2D2", section: "diaType1" },

    { position: "G1S1", section: "diaType2" },
    { position: "G1S2", section: "diaType2" },
    { position: "G2S1", section: "diaType2" }
  ],

  diaphragmSectionList: {
    diaType1: {
      lowerHeight: 250,
      lowerThickness: 12,
      lowerTopThickness: 10,
      lowerTopwidth: 100,
      upperThickness: 12,
      longiRibHeight: 150,
      longiRibRayout: [-180, 180],
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
    { position: "G1V3", section: "vStiffType1" },
    { position: "G1V4", section: "vStiffType1" },
    { position: "G1V5", section: "vStiffType1" },
    { position: "G1V6", section: "vStiffType1" },
    { position: "G1V7", section: "vStiffType1" },
    { position: "G1V8", section: "vStiffType1" },
    { position: "G1V9", section: "vStiffType1" },
    { position: "G1V10", section: "vStiffType1" },
    { position: "G1V11", section: "vStiffType1" },
    { position: "G1V12", section: "vStiffType1" },
    { position: "G2V2", section: "vStiffType1" }
  ],

  vStiffSectionList: {
    vStiffType1: {
      sideHeight: 200,
      sideThickness: 14,
      upperHeight: 220,
      bottomOffset: 60,
      // added variables
      scallopRadius: 35,
      sideScallopOffset: 200,
      //L100x100x10 section point, origin = (0,0)
      spc: 50,
      pts: [100, 10, 0, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
    }
  },

  hBracingLayout: [
    {
      from: "G1V1",
      to: "G1D1",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D1",
      to: "G1V2",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V2",
      to: "G1D2",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D2",
      to: "G1V3",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V3",
      to: "G1D3",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D3",
      to: "G1V4",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V4",
      to: "G1D4",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D4",
      to: "G1V5",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V5",
      to: "G1D5",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D5",
      to: "G1V6",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V6",
      to: "G1D6",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D6",
      to: "G1V7",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V7",
      to: "G1D7",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D7",
      to: "G1V8",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V8",
      to: "G1D8",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D8",
      to: "G1V9",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V9",
      to: "G1D9",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D9",
      to: "G1V10",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V10",
      to: "G1D10",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G1D10",
      to: "G1V11",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    },
    {
      from: "G1V11",
      to: "G1S2",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, true]
    },

    {
      from: "G2V1",
      to: "G2D2",
      leftToright: false,
      section: "hBracingType1",
      platelayout: [true, false]
    },
    {
      from: "G2D2",
      to: "G2V2",
      leftToright: true,
      section: "hBracingType1",
      platelayout: [false, true]
    }
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

  zPosition: 0
};