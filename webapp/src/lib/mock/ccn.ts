import { L, type Ccn } from "@/lib/schema";

/* 3 CCN theo sitemap.xml (DECISIONS #3: 3 cụm; Thụy Trường = ⚠️CONFIRM 4).
   - Hưng Nhân: dữ liệu ĐẦY ĐỦ 12 mục (demo template trọn vẹn).
   - Đức Hiệp: vừa phải.
   - Cồn Nhất: THƯA (nhiều mảng rỗng) → demo AC-02 "ẩn section khi không có dữ liệu". */

export const CCNS: Ccn[] = [
  {
    slug: "ccn-hung-nhan",
    name: L("CCN Hưng Nhân", "Hung Nhan Cluster"),
    tagline: L(
      "Cụm công nghiệp đa ngành 50 ha — kết nối nhanh cảng Hải Phòng, hạ tầng kỹ thuật đồng bộ.",
      "A 50-ha multi-sector cluster with fast access to Hai Phong port.",
    ),
    heroImage: "ccn/hung-nhan/hero",
    status: "dang-cho-thue",
    overview: L(
      "CCN Hưng Nhân quy mô 50 ha, định hướng đa ngành: chế biến nông sản, dệt may phụ trợ, cơ khí và điện tử. Hạ tầng kỹ thuật hoàn thiện theo từng giai đoạn, sẵn sàng bàn giao mặt bằng sạch cho nhà đầu tư.",
      "",
    ),
    area: 50,
    occupancy: 35,
    priceFrom: L("từ 45 USD/m²/chu kỳ thuê", "from 45 USD/m²/lease cycle"),
    landType: L("Đất công nghiệp + kho bãi", "Industrial land + warehousing"),
    location: {
      address: L("Xã Hưng Nhân, tỉnh Hưng Yên (Thái Bình cũ)", "Hung Nhan, Hung Yen Province"),
      lat: 20.55,
      lng: 106.27,
      image: "ccn/hung-nhan/location",
      distances: [
        { label: L("Cảng Hải Phòng", "Hai Phong port"), value: "~70 km" },
        { label: L("Sân bay Cát Bi", "Cat Bi airport"), value: "~65 km" },
        { label: L("Trung tâm Hà Nội", "Hanoi center"), value: "~110 km" },
        { label: L("Quốc lộ 10", "National route 10"), value: "~2 km" },
      ],
    },
    masterPlanImage: "ccn/hung-nhan/master-plan",
    zones: [
      { name: L("Phân khu A — nhà máy lớn", "Zone A — large factories"), note: L("Lô 1–3 ha", "1–3 ha lots") },
      { name: L("Phân khu B — nhà xưởng vừa", "Zone B — medium"), note: L("Lô 0.5–1 ha", "0.5–1 ha lots") },
      { name: L("Phân khu C — kho & dịch vụ", "Zone C — warehouse & service") },
      { name: L("Cây xanh & hạ tầng kỹ thuật", "Green & utilities") },
    ],
    infrastructure: [
      { icon: "Zap", label: L("Cấp điện", "Power"), spec: L("Trạm 110/22kV, cấp đến hàng rào", "110/22kV substation") },
      { icon: "Droplets", label: L("Cấp nước", "Water"), spec: L("5.000 m³/ngày đêm", "5,000 m³/day") },
      { icon: "Recycle", label: L("Xử lý nước thải", "Wastewater"), spec: L("Trạm XLNT 3.000 m³/ngày", "3,000 m³/day WWTP") },
      { icon: "Wifi", label: L("Viễn thông", "Telecom"), spec: L("Cáp quang FTTH đến lô", "FTTH to lots") },
      { icon: "TrafficCone", label: L("Giao thông nội khu", "Internal roads"), spec: L("Đường chính 2 làn, tải trọng cao", "2-lane main roads") },
      { icon: "Flame", label: L("PCCC", "Fire safety"), spec: L("Hệ thống cấp nước chữa cháy riêng", "Dedicated fire mains") },
    ],
    industries: [
      { name: L("Chế biến nông sản", "Agri-processing"), type: "uu-tien" },
      { name: L("Dệt may phụ trợ", "Textile supporting"), type: "uu-tien" },
      { name: L("Cơ khí chế tạo", "Mechanical"), type: "duoc" },
      { name: L("Điện tử", "Electronics"), type: "duoc" },
      { name: L("Ngành ô nhiễm cao", "High-pollution"), type: "han-che" },
    ],
    labor: [
      { label: L("Dân số khu vực", "Local population"), value: L("~120.000 người", "~120,000") },
      { label: L("Lực lượng lao động", "Workforce"), value: L("~65.000 người", "~65,000") },
      { label: L("Trường nghề lân cận", "Vocational schools"), value: L("3 trường (bán kính 10 km)", "3 within 10 km") },
    ],
    incentives: [
      L("Ưu đãi thuế TNDN theo địa bàn khuyến khích đầu tư", "CIT incentives"),
      L("Miễn/giảm tiền thuê đất các năm đầu", "Land rent exemption in early years"),
      L("Hỗ trợ thủ tục cấp phép, môi trường, PCCC", "Permit & compliance support"),
    ],
    legal: [
      { item: L("Quy hoạch chi tiết 1/500", "Detailed plan 1/500"), status: "xong" },
      { item: L("Quyết định chủ trương đầu tư", "Investment policy decision"), status: "xong" },
      { item: L("Giải phóng mặt bằng", "Site clearance"), status: "dang-lam" },
      { item: L("Đánh giá tác động môi trường (ĐTM)", "EIA"), status: "xong" },
    ],
    progress: 60,
    milestones: [
      { date: "2023", label: L("Phê duyệt quy hoạch 1/500", "1/500 approved"), done: true },
      { date: "2024", label: L("Hoàn thành hạ tầng giai đoạn 1", "Phase 1 infra done"), done: true },
      { date: "2025", label: L("Bàn giao lô đầu tiên", "First lot handover"), done: true },
      { date: "2026", label: L("Hoàn thiện trạm XLNT & giai đoạn 2", "WWTP & phase 2"), done: false },
    ],
    gallery: ["ccn/hung-nhan/g1", "ccn/hung-nhan/g2", "ccn/hung-nhan/g3", "ccn/hung-nhan/g4", "ccn/hung-nhan/g5", "ccn/hung-nhan/g6"],
    flycamVideo: "ccn/hung-nhan/flycam",
  },

  {
    slug: "ccn-duc-hiep",
    name: L("CCN Đức Hiệp", "Duc Hiep Cluster"),
    tagline: L("Cụm công nghiệp 42 ha, ưu tiên công nghiệp hỗ trợ và logistics.", "A 42-ha cluster for supporting industries & logistics."),
    heroImage: "ccn/duc-hiep/hero",
    status: "sap-mo-ban",
    overview: L(
      "CCN Đức Hiệp 42 ha, vị trí thuận lợi cho công nghiệp hỗ trợ và kho vận, đang trong giai đoạn hoàn thiện hạ tầng và mở bán.",
      "",
    ),
    area: 42,
    occupancy: 15,
    priceFrom: L("từ 42 USD/m²/chu kỳ thuê", "from 42 USD/m²"),
    landType: L("Đất công nghiệp", "Industrial land"),
    location: {
      address: L("Xã Đức Hiệp, tỉnh Hưng Yên (Thái Bình cũ)", "Duc Hiep, Hung Yen Province"),
      lat: 20.49,
      lng: 106.33,
      distances: [
        { label: L("Cảng Hải Phòng", "Hai Phong port"), value: "~80 km" },
        { label: L("Quốc lộ 10", "Route 10"), value: "~5 km" },
      ],
    },
    masterPlanImage: "ccn/duc-hiep/master-plan",
    zones: [
      { name: L("Phân khu sản xuất", "Production zone") },
      { name: L("Khu kho vận", "Logistics zone") },
    ],
    infrastructure: [
      { icon: "Zap", label: L("Cấp điện", "Power"), spec: L("Trạm 110/22kV", "110/22kV") },
      { icon: "Droplets", label: L("Cấp nước", "Water"), spec: L("3.000 m³/ngày đêm", "3,000 m³/day") },
      { icon: "Recycle", label: L("Xử lý nước thải", "Wastewater"), spec: L("Đang đầu tư", "Under construction") },
      { icon: "Flame", label: L("PCCC", "Fire safety") },
    ],
    industries: [
      { name: L("Công nghiệp hỗ trợ", "Supporting industries"), type: "uu-tien" },
      { name: L("Logistics & kho vận", "Logistics"), type: "uu-tien" },
      { name: L("Chế biến", "Processing"), type: "duoc" },
    ],
    labor: [{ label: L("Lực lượng lao động", "Workforce"), value: L("~50.000 người", "~50,000") }],
    incentives: [L("Ưu đãi thuê đất giai đoạn mở bán", "Launch-phase land incentives")],
    legal: [
      { item: L("Quy hoạch chi tiết 1/500", "1/500 plan"), status: "xong" },
      { item: L("Giải phóng mặt bằng", "Site clearance"), status: "dang-lam" },
    ],
    progress: 35,
    milestones: [
      { date: "2024", label: L("Phê duyệt quy hoạch", "Plan approved"), done: true },
      { date: "2026", label: L("Hoàn thiện hạ tầng giai đoạn 1", "Phase 1 infra"), done: false },
    ],
    gallery: ["ccn/duc-hiep/g1", "ccn/duc-hiep/g2", "ccn/duc-hiep/g3"],
  },

  {
    slug: "ccn-con-nhat",
    name: L("CCN Cồn Nhất", "Con Nhat Cluster"),
    tagline: L("Cụm công nghiệp ven sông, quỹ đất sạch, đang quy hoạch.", "A riverside cluster, clean land bank, in planning."),
    heroImage: "ccn/con-nhat/hero",
    status: "sap-mo-ban",
    overview: L(
      "CCN Cồn Nhất đang trong giai đoạn quy hoạch và chuẩn bị đầu tư. Thông tin chi tiết sẽ được cập nhật theo tiến độ.",
      "",
    ),
    area: 38,
    location: {
      address: L("Xã Cồn Nhất, tỉnh Hưng Yên (Thái Bình cũ)", "Con Nhat, Hung Yen Province"),
      distances: [{ label: L("Quốc lộ ven biển", "Coastal highway"), value: "~3 km" }],
    },
    // Các mục dưới để rỗng → UI tự ẩn (AC-02)
    zones: [],
    infrastructure: [],
    industries: [{ name: L("Đa ngành (dự kiến)", "Multi-sector (planned)"), type: "duoc" }],
    labor: [],
    incentives: [],
    legal: [{ item: L("Lập quy hoạch", "Planning"), status: "dang-lam" }],
    milestones: [],
    gallery: [],
  },
];
