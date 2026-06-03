import { getPayload } from 'payload'
import config from './payload.config'
import dotenv from 'dotenv'

dotenv.config()

const createLexicalRichText = (text: string) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: text,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

const createLexicalBody = (blocks: { type: 'p' | 'h2' | 'li'; text: string }[]) => {
  const children: any[] = []
  let currentList: any = null

  blocks.forEach((block) => {
    if (block.type === 'li') {
      if (!currentList) {
        currentList = {
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          format: '',
          indent: 0,
          version: 1,
          children: [],
        }
        children.push(currentList)
      }
      currentList.children.push({
        type: 'listitem',
        value: 1,
        children: [
          {
            type: 'text',
            text: block.text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
    } else {
      currentList = null
      if (block.type === 'h2') {
        children.push({
          type: 'heading',
          tag: 'h2',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: block.text,
              version: 1,
            },
          ],
        })
      } else {
        children.push({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: block.text,
              version: 1,
            },
          ],
        })
      }
    }
  })

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  }
}

const servicesData = [
  {
    slug: 'hk-company',
    icon: 'briefcase',
    price: 3800,
    title: {
      'zh-HK': '香港公司註冊及成立',
      'zh-CN': '香港公司注册及成立',
      en: 'Hong Kong Company Incorporation',
    },
    shortDescription: {
      'zh-HK': '提供快捷的一站式成立香港有限公司服務，最快 1 天內完成。',
      'zh-CN': '提供快捷的一站式成立香港有限公司服务，最快 1 天内完成。',
      en: 'Fast one-stop service for setting up a Hong Kong limited company, as fast as 1 business day.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '香港作為國際金融中心，法制健全，稅率低，是拓展全球業務的首選。我們的一站式香港公司成立服務包括：名稱查冊、申辦商業登記證、準備法定合規文件，最快一天內即可完成電子註冊開展業務。',
      ),
      'zh-CN': createLexicalRichText(
        '香港作为国际金融中心，法制健全，税率低，是拓展全球业务的首选。我们的一站式香港公司成立服务包括：名称查册、申办商业登记证、准备法定合规文件，最快一天内即可完成电子注册开展业务。',
      ),
      en: createLexicalRichText(
        'Hong Kong, as an international financial hub, features a robust legal system and low tax rates, making it the preferred choice for expanding global businesses. Our one-stop incorporation service covers name search, business registration certificate application, and statutory filing preparations within 1 day.',
      ),
    },
  },
  {
    slug: 'company-secretary',
    icon: 'shield',
    price: 1800,
    title: {
      'zh-HK': '香港法定公司秘書服務',
      'zh-CN': '香港法定公司秘书服务',
      en: 'Company Secretary Services',
    },
    shortDescription: {
      'zh-HK': '提供年度法定合規申報、周年申報表申報及董事股東變更事宜。',
      'zh-CN': '提供年度法定合规申报、周年申报表申报及董事股东变更事宜。',
      en: 'Providing annual compliance filings, annual returns, and handling changes of directors or shareholders.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '香港法例規定，每家香港公司必須委任一名公司秘書。我們作為持牌信託及公司服務提供者，為您提供法定公司秘書服務，包含編製周年申報表、更改董事或股東資料、準備會議紀錄，確保您的公司運營符合香港法規要求。',
      ),
      'zh-CN': createLexicalRichText(
        '香港法例规定，每家香港公司必须委任一名公司秘书。我们作为持牌信托及公司服务提供者，为您提供法定公司秘书服务，包含编制周年申报表、更改董事或股东资料、准备会议纪录，确保您的公司运营符合香港法规要求。',
      ),
      en: createLexicalRichText(
        'According to HK law, every local company must appoint a Company Secretary. As a licensed Trust and Corporate Service Provider, we offer comprehensive company secretarial services, including preparing annual returns, updating director/shareholder logs, and keeping minutes to ensure complete compliance.',
      ),
    },
  },
  {
    slug: 'accounting-tax',
    icon: 'file-text',
    price: 3500,
    title: {
      'zh-HK': '會計做帳與稅務審計',
      'zh-CN': '会计做账与税务审计',
      en: 'Accounting & Auditing Services',
    },
    shortDescription: {
      'zh-HK': '專業會計師團隊為您處理日常帳目、配合核數師進行審計及申報利得稅。',
      'zh-CN': '专业会计师团队为您处理日常账目、配合核数师进行审计及申报利得税。',
      en: 'Professional accountants to handle your bookkeeping, assist in auditing coordination, and tax filings.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '香港公司每年需要進行利得稅申報。我們資深的會計團隊能協助您整理原始憑證、進行月度及年度做帳、出具財務報表，並引薦註冊核數師（審計師）進行審計，完成一站式稅務合規申報，合理規劃稅務策略。',
      ),
      'zh-CN': createLexicalRichText(
        '香港公司每年需要进行利得税申报。我们资深会计团队能协助您整理原始凭证、进行月度及年度做账、出具财务报表，并引荐注册核数师（审计师）进行审计，完成一站式税务合规申报，合理规划税务策略。',
      ),
      en: createLexicalRichText(
        'Hong Kong companies are required to submit profits tax returns annually. Our accounting team assists with bookkeeping, financial statements preparation, and coordinating with independent registered auditors to deliver seamless audit reports and tax filing.',
      ),
    },
  },
  {
    slug: 'trademark-ip',
    icon: 'award',
    price: 4500,
    title: {
      'zh-HK': '全球商標與知識產權',
      'zh-CN': '全球商标与知识产权',
      en: 'Global Trademark & IP Protection',
    },
    shortDescription: {
      'zh-HK': '香港及海外商標註冊申請，保護您的品牌商譽，專業近似檢索。',
      'zh-CN': '香港及海外商标注册申请，保护您的品牌商誉，专业近似检索。',
      en: 'Trademark registration applications in Hong Kong and worldwide to protect your brand intellectual property.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '保護品牌從商標註冊開始。我們提供香港商標申請、中國內地商標申請以及全球各大主流經濟體（如美、日、歐盟）的商標與專利權註冊。提供專業的前期商標查冊、近似性評估，助您的品牌穩步走向國際市場。',
      ),
      'zh-CN': createLexicalRichText(
        '保护品牌从商标注册开始。我们提供香港商标申请、中国内地商标申请以及全球各大主流经济体（如美、日、欧盟）的商标与专利权注册。提供专业的前期商标查册、近似性评估，助您的品牌稳步走向国际市场。',
      ),
      en: createLexicalRichText(
        'Brand protection starts with trademark registration. We provide trademark and patent registry services in Hong Kong, Mainland China, and global jurisdictions. Our team provides professional search and risk assessment to secure your business goodwill.',
      ),
    },
  },
  {
    slug: 'virtual-office',
    icon: 'map-pin',
    price: 1200,
    title: {
      'zh-HK': '虛擬辦公室與商業秘書',
      'zh-CN': '虚拟办公室与商业秘书',
      en: 'Virtual Office & Support',
    },
    shortDescription: {
      'zh-HK': '提供政府認可的香港甲級商業註冊地址，代收信件、郵件轉寄及專用電話熱線。',
      'zh-CN': '提供政府认可的香港甲级商业注册地址，代收信件、邮件转寄及专用电话热线。',
      en: 'Providing government-compliant prime registered addresses in Hong Kong, mail handling, forwarding, and call answers.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '對於初創公司與跨國公司，我們提供香港黃金商業地段（上環/中環）的註冊地址作為政府合規註冊使用。服務包含：代收政府及商業信件、提供郵件掃描與郵寄轉寄服務，更可為您提供香港本地專線電話以提升企業形象。',
      ),
      'zh-CN': createLexicalRichText(
        '对于初创公司与跨国公司，我们提供香港黄金商业地段（上环/中环）的注册地址作为政府合规注册使用。服务包含：代收政府及商业信件、提供邮件扫描与邮件转寄服务，更可为您提供香港本地专线电话以提升企业形象。',
      ),
      en: createLexicalRichText(
        'For startups and overseas enterprises, we provide prime registered office addresses in Hong Kong. Services include mail handling, digital scanning, forwarding, and dedicated phone line setups to establish a strong local presence.',
      ),
    },
  },
  // Additional 17 Services
  {
    slug: 'china-company',
    icon: 'briefcase',
    price: 12800,
    title: {
      'zh-HK': '中國公司註冊及成立',
      'zh-CN': '中国公司注册及成立',
      en: 'China Company Setup',
    },
    shortDescription: {
      'zh-HK': '進軍中國內地市場，設立外商獨資企業(WFOE)或合資公司。',
      'zh-CN': '进军中国内地市场，设立外商独资企业(WFOE)或合资公司。',
      en: 'Establish a Wholly Foreign-Owned Enterprise (WFOE) or Joint Venture in Mainland China.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '外國企業進軍中國內地市場，可選擇註冊外商獨資企業 (WFOE)、合資企業或代表處。我們提供由名稱核准、工商登記、稅務申報到開立銀行賬戶的一站式服務，幫助外資企業快速在內地開展合規經營。',
      ),
      'zh-CN': createLexicalRichText(
        '外国企业进军中国内地市场，可选择注册外商独资企业 (WFOE)、合资企业或代表处。我们提供由名称核准、工商登记、税务申报到开立银行账户的一站式服务，帮助外资企业快速在内地开展合规经营。',
      ),
      en: createLexicalRichText(
        'To enter the Mainland Chinese market, foreign businesses can incorporate a WFOE, JV, or Representative Office. We offer comprehensive support including name validation, business license filing, tax setup, and banking assistance.',
      ),
    },
  },
  {
    slug: 'singapore-company',
    icon: 'briefcase',
    price: 9800,
    title: {
      'zh-HK': '新加坡公司註冊及成立',
      'zh-CN': '新加坡公司注册及成立',
      en: 'Singapore Company Setup',
    },
    shortDescription: {
      'zh-HK': '進入東南亞市場的黃金門戶，低稅率與極佳的商業信譽。',
      'zh-CN': '进入东南亚市场的黄金门户，低税率与极佳的商业信誉。',
      en: 'The golden gateway to Southeast Asia, offering low corporate tax and outstanding business credibility.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '新加坡作為亞洲的重要金融樞紐，以其高效的親商環境和極低的企業所得稅率聞名。在新加坡成立公司，可享受多項政府孵化計劃與稅收減免，特別適合高科技、金融及國際貿易企業。',
      ),
      'zh-CN': createLexicalRichText(
        '新加坡作为亚洲的重要金融枢纽，以其高效的亲商环境和极低的企业所得税率闻名。在新加坡成立公司，可享受多项政府孵化计划与税收减免，特别适合高科技、金融及国际贸易企业。',
      ),
      en: createLexicalRichText(
        'Singapore stands as a premier Asian financial hub, renowned for its business-friendly ecosystem and low corporate tax rates. Setting up a Singapore entity allows access to tax incentives and grants, perfect for tech, fintech, and trading groups.',
      ),
    },
  },
  {
    slug: 'bvi-company',
    icon: 'briefcase',
    price: 9800,
    title: {
      'zh-HK': '英屬處女群島(BVI)公司註冊',
      'zh-CN': '英属处女群岛(BVI)公司注册',
      en: 'BVI Company Setup',
    },
    shortDescription: {
      'zh-HK': '離岸公司熱門首選，法規健全，高度隱私與保密性。',
      'zh-CN': '离岸公司热门首选，法规健全，高度隐私与保密性。',
      en: 'Top offshore destination, backed by a robust legal framework, strict privacy, and zero tax on offshore profits.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '英屬處女群島 (BVI) 是全球最受歡迎的離岸公司註冊地之一。BVI 具備健全的法律制度、免除離岸業務稅收、保密性高（股東及董事資料不公開），非常適合用於跨國投資、資產配置與稅務規劃。',
      ),
      'zh-CN': createLexicalRichText(
        '英属处女群岛 (BVI) 是全球最受欢迎的离岸公司注册地之一。BVI 具备健全的法律制度、免除离岸业务税收、保密性高（股东及董事资料不公开），非常适合用于跨国投资、资产配置与税务规划。',
      ),
      en: createLexicalRichText(
        'The British Virgin Islands (BVI) is a leading global offshore corporate hub. It offers a trusted legal system, zero corporate tax on international business, and high confidentiality of corporate structures, making it optimal for holding companies and wealth planning.',
      ),
    },
  },
  {
    slug: 'cayman-company',
    icon: 'briefcase',
    price: 29800,
    title: {
      'zh-HK': '開曼群島公司註冊',
      'zh-CN': '开曼群岛公司注册',
      en: 'Cayman Islands Company Setup',
    },
    shortDescription: {
      'zh-HK': '適合上市、境外融資與投資基金。',
      'zh-CN': '适合上市、境外融资与投资基金。',
      en: 'Perfect for IPO listings, venture capital, PE funding, and investment vehicles.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '開曼群島公司是全球知名交易所（如港交所、紐交所、納斯達克）普遍接受的上市主體結構。開曼擁有靈活的企業法、極高的信譽度，是創業投資基金（VC）、私募股權基金（PE）以及跨國集團進行境外重組的首選。',
      ),
      'zh-CN': createLexicalRichText(
        '开曼群岛公司是全球知名交易所（如港交所、纽交所、纳斯达克）普遍接受的上市主体结构。开曼拥有灵活的企业法、极高的信誉度，是创业投资基金（VC）、私募股权基金（PE）以及跨国集团进行境外重组的首选。',
      ),
      en: createLexicalRichText(
        'Cayman Islands companies are widely recognized and accepted by major global stock exchanges (HKEX, NYSE, NASDAQ) for IPO listings. Possessing a flexible corporate act and supreme credit, it is the primary choice for VCs, PEs, and corporate restructuring.',
      ),
    },
  },
  {
    slug: 'seychelles-company',
    icon: 'briefcase',
    price: 7000,
    title: {
      'zh-HK': '塞舌爾群島公司註冊',
      'zh-CN': '塞舌尔群岛公司注册',
      en: 'Seychelles Company Setup',
    },
    shortDescription: {
      'zh-HK': '快速成立的國際商業公司(IBC)，成本低廉。',
      'zh-CN': '快速成立的国际商业公司(IBC)，成本低廉。',
      en: 'Fast incorporation of an International Business Company (IBC) at highly affordable setup and annual costs.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '塞舌爾群島是另一個重要的離岸金融中心，提供快速且性價比高的國際商業公司 (IBC) 註冊服務。塞舌爾公司享有離岸利潤免稅、隱私保護強大、無須申報周年申報表等優勢。',
      ),
      'zh-CN': createLexicalRichText(
        '塞舌尔群岛是另一个重要的离岸金融中心，提供快速且性价比高的国际商业公司 (IBC) 注册服务。塞舌尔公司享有离岸利润免税、隐私保护强大、无须申报周年申报表等优势。',
      ),
      en: createLexicalRichText(
        'Seychelles is a prime offshore center offering fast, cost-effective International Business Company (IBC) formations. Benefits include offshore profit tax exemptions, heavy privacy laws, and no requirement for annual audited accounts filings.',
      ),
    },
  },
  {
    slug: 'samoa-company',
    icon: 'briefcase',
    price: 7800,
    title: {
      'zh-HK': '薩摩亞公司註冊',
      'zh-CN': '萨摩亚公司注册',
      en: 'Samoa Company Setup',
    },
    shortDescription: {
      'zh-HK': '太平洋地區熱門離岸註冊地，適合信託與資產保護。',
      'zh-CN': '太平洋地区热门离岸注册地，适合信托与资产保护。',
      en: 'A popular Pacific offshore destination, offering flexible structures for asset protection and trust planning.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '薩摩亞公司以靈活的合規要求和強大的資產保護功能著稱，支持中文名稱註冊，費用合理，沒有嚴格的外匯管制，非常適合亞洲客戶進行財富保全與信託搭建。',
      ),
      'zh-CN': createLexicalRichText(
        '萨摩亚公司以灵活的合规要求和强大的资产保护功能著称，支持中文名称注册，费用合理，没有严格的外汇管制，非常适合亚洲客户进行财富保全与信托搭建。',
      ),
      en: createLexicalRichText(
        'Samoa companies are recognized for flexible compliance and strong asset protection. It supports Chinese characters in company names, has competitive maintenance costs, and no strict foreign exchange controls, ideal for wealth preservation.',
      ),
    },
  },
  {
    slug: 'marshall-company',
    icon: 'briefcase',
    price: 9000,
    title: {
      'zh-HK': '馬紹爾群島公司註冊',
      'zh-CN': '马绍尔群岛公司注册',
      en: 'Marshall Islands Company Setup',
    },
    shortDescription: {
      'zh-HK': '國際船務及上市融資的優質離岸平台。',
      'zh-CN': '马绍尔群岛公司注册',
      en: 'An exceptional offshore platform widely utilized for international shipping, maritime vessels, and listings.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '馬紹爾群島是知名的現代離岸司法管轄區，其法律框架基於美國特拉華州公司法，信譽良好。馬紹爾公司廣泛應用於國際船務租賃、境外融資與首次公開募股 (IPO)。',
      ),
      'zh-CN': createLexicalRichText(
        '马绍尔群岛是知名的现代离岸司法管辖区，其法律框架基于美国特拉华州公司法，信誉良好。马绍尔公司广泛应用于国际船务租赁、境外融资与首次公开募股 (IPO)。',
      ),
      en: createLexicalRichText(
        'The Marshall Islands is a reputable modern offshore jurisdiction whose corporate act is closely modeled after Delaware law. Marshall corporations are popular for maritime shipping registrations, listings, and offshore funding.',
      ),
    },
  },
  {
    slug: 'us-company',
    icon: 'briefcase',
    price: 8500,
    title: {
      'zh-HK': '美國/特拉華州公司註冊',
      'zh-CN': '美国/特拉华州公司注册',
      en: 'US / Delaware Company Setup',
    },
    shortDescription: {
      'zh-HK': '全球融資與跨境電商的首選，商業法律體系極為完善。',
      'zh-CN': '美国/特拉华州公司注册',
      en: 'The preferred choice for global financing, venture capital, and major US e-commerce merchant setups.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '特拉華州 (Delaware) 擁有全美乃至全球最健全的商業法庭和公司法體系，是美國大多數上市公司和高科技初創企業的誕生地。對於開展跨境電商（如 Amazon、Stripe 帳戶申請）或尋求美元基金投資的企業而言，特拉華州公司是最佳選擇。',
      ),
      'zh-CN': createLexicalRichText(
        '特拉华州 (Delaware) 拥有全美乃至全球最健全的商业法庭和公司法体系，是美国大多数上市公司和高科技初创企业的诞生地。对于开展跨境电商（如 Amazon、Stripe 帐户申请）或寻求美元基金投资的企业而言，特拉华州公司最佳选择。',
      ),
      en: createLexicalRichText(
        'Delaware boasts the most mature corporate law system in the US, acting as home to the majority of Fortune 500 corporations and tech startups. Highly recommended for businesses applying for US banking (Stripe, Amazon) and raising USD venture capital.',
      ),
    },
  },
  {
    slug: 'notarization',
    icon: 'file-text',
    price: 5000,
    title: {
      'zh-HK': '中國及國際公證服務',
      'zh-CN': '中国及国际公证服务',
      en: 'Notarization Services',
    },
    shortDescription: {
      'zh-HK': '提供中國委託公證人公證、海牙認證與各國使領館認證。',
      'zh-CN': '中国及国际公证服务',
      en: 'Providing legal notarizations by China-Appointed Attesting Officers, Apostille, and Embassy authentications.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '跨境商業活動中，香港或海外文件如需在中國內地或國外使用，必須進行法律公證。我們提供司法部指定的「中國委託公證人公證」、國際海牙認證 (Apostille) 及各國駐港使領館的雙重認證服務，確保文件具備完整法律效力。',
      ),
      'zh-CN': createLexicalRichText(
        '跨境商业活动中，香港或海外文件如需在中国内地或国外使用，必须进行法律公证。我们提供司法部指定的「中国委托公证人公证」、国际海牙认证 (Apostille) 及各国驻港使领馆的双重认证服务，确保文件具备完整法律效力。',
      ),
      en: createLexicalRichText(
        'For cross-border commercial transactions, HK documents used in Mainland China or overseas require legalization. We coordinate China-Appointed Attesting Officer notarizations, Apostille services, and dual Embassy attestations to guarantee complete legal compliance.',
      ),
    },
  },
  {
    slug: 'bank-account',
    icon: 'briefcase',
    price: 3500,
    title: {
      'zh-HK': '商業銀行開戶代理服務',
      'zh-CN': '商业银行开户代理服务',
      en: 'Bank Account Setup Assistance',
    },
    shortDescription: {
      'zh-HK': '提供香港及海外銀行開戶預審與約見協助。',
      'zh-CN': '商业银行开户代理服务',
      en: 'Professional banking pre-reviews and interview preparation for HK and international corporate accounts.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '我們與多家香港本地及國際知名商業銀行（如匯豐、恒生、渣打、中銀、大新等）建立了長期合作關係。我們為客戶提供開戶前的資料預審、商業計劃書潤色，並協助預約銀行經理見面，大幅提高商業賬戶的開立成功率。',
      ),
      'zh-CN': createLexicalRichText(
        '我们与多家香港本地及国际知名商业银行（如汇丰、恒生、渣打、中银、大新等）建立了长期合作关系。我们为客户提供开户前的资料预审、商业计划书润色，并协助预约银行经理见面，大幅提高商业账户的开立成功率。',
      ),
      en: createLexicalRichText(
        'We maintain long-term corporate relationships with top HK and global commercial banks (HSBC, Hang Seng, Standard Chartered, BOCHK, Dah Sing). We assist with application document pre-screening, business plan tuning, and meeting appointments to ensure a high success rate.',
      ),
    },
  },
  {
    slug: 'hr-payroll',
    icon: 'file-text',
    price: 2500,
    title: {
      'zh-HK': '人力資源及薪資管理服務',
      'zh-CN': '人力资源及薪资管理服务',
      en: 'HR & Payroll Management',
    },
    shortDescription: {
      'zh-HK': '代辦強積金(MPF)、計算薪酬及申報僱主稅務申報表。',
      'zh-CN': '人力资源及薪资管理服务',
      en: 'Outsourced MPF handling, salary computations, and annual employer tax returns filings.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '針對香港本地中小企與外資企業，我們提供外包的人力資源管理。包含日常薪資計算、強積金 (MPF) 供款申報、勞工保險投保建議以及年度僱主稅務申報表填報，幫助企業降低營運成本。',
      ),
      'zh-CN': createLexicalRichText(
        '针对香港本地中小企与外资企业，我们提供外包的人力资源管理。包含日常薪资计算、强积金 (MPF) 供款申报、劳工保险投保建议以及年度雇主税务申报表填报，帮助企业降低营运成本。',
      ),
      en: createLexicalRichText(
        'Tailored for SMEs and multinational operations in HK, we provide comprehensive payroll calculations, MPF setups and monthly filings, employee compensation insurance arrangements, and employer returns filings to minimize overheads.',
      ),
    },
  },
  {
    slug: 'global-communication',
    icon: 'map-pin',
    price: 1500,
    title: {
      'zh-HK': '全球商務通訊服務',
      'zh-CN': '全球商务通讯服务',
      en: 'Global Communication Support',
    },
    shortDescription: {
      'zh-HK': '提供本地電話號碼專線接聽與傳真轉寄服務。',
      'zh-CN': '全球商务通讯服务',
      en: 'Dedicated local phone lines answered in your company name, combined with fax forwarding.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '為配合虛擬辦公室使用，我們提供專門的本地商務通訊秘書。可為您的公司分配一個專屬的香港電話號碼，由專業秘書以您公司名義接聽電話，並將傳真或郵件即時以電子郵件方式轉寄給您，有效提升您的品牌專業度。',
      ),
      'zh-CN': createLexicalRichText(
        '为配合虚拟办公室使用，我们提供专门的本地商务通讯秘书。可为您的公司分配一个专属的香港电话号码，由专业秘书以您公司名义接听电话，并将传真或邮件即时以电子邮件方式转寄给您，有效提升您的品牌专业度。',
      ),
      en: createLexicalRichText(
        'Complementing our virtual office plans, we offer dedicated telephone secretary answering services. We assign a local HK number answered in your company name, transferring messages, faxes, or calls directly to you via email.',
      ),
    },
  },
  {
    slug: 'design-registration',
    icon: 'award',
    price: 4500,
    title: {
      'zh-HK': '外觀設計註冊及保護',
      'zh-CN': '外观设计注册及保护',
      en: 'Design Registration & Protection',
    },
    shortDescription: {
      'zh-HK': '申請香港與全球外觀專利，保護產品視覺設計與外形。',
      'zh-CN': '外观设计注册及保护',
      en: 'Secure design patents in Hong Kong and global markets to defend product shapes and configurations.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '產品的獨特外觀是其核心競爭力之一。我們提供香港及全球司法管轄區的外觀設計註冊代理。為您的產品外形、圖案或線條提供專屬權利保障，防止競爭對手抄襲產品視覺外觀。',
      ),
      'zh-CN': createLexicalRichText(
        '产品的独特外观是其核心竞争力之一。我们提供香港及全球司法辖区的外观设计注册代理。为您的产品外形、图案或线条提供专属权利保障，防止竞争对手抄袭产品视觉外观。',
      ),
      en: createLexicalRichText(
        'Unique styling is a key commercial asset. We register product designs, shapes, patterns, or ornamentations in HK and internationally, granting you absolute rights to block competitor visual copycats.',
      ),
    },
  },
  {
    slug: 'patent-registration',
    icon: 'award',
    price: 15000,
    title: {
      'zh-HK': '專利註冊與基金申請',
      'zh-CN': '专利注册与基金申请',
      en: 'Patent Registration & Funding',
    },
    shortDescription: {
      'zh-HK': '協助申請標準專利與短期專利，並對接政府專利申請資助基金。',
      'zh-CN': '专利注册与基金申请',
      en: 'Filing patent applications in HK, coupled with managing the HK PAG Gov grant of up to HKD 250,000.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '我們協助企業和發明人申請香港標準專利（轉錄）及短期專利，保障技術創新。同時，我們能協助符合條件的香港本地企業申報政府高達 25 萬港幣的「專利申請資助計劃 (PAG)」，減輕創新研發成本。',
      ),
      'zh-CN': createLexicalRichText(
        '我们协助企业和发明人申请香港标准专利（转录）及短期专利，保障技术创新。同时，我们能协助符合条件的香港本地企业申报政府高达 25 万港币的「专利申请资助计划 (PAG)」，减轻创新研发成本。',
      ),
      en: createLexicalRichText(
        'We draft and lodge HK Standard Patents and Short-term Patents to secure proprietary technologies. Additionally, we represent companies in applying for the HK Government PAG grant (up to HKD 250k) to offset technology costs.',
      ),
    },
  },
  {
    slug: 'domain-registration',
    icon: 'award',
    price: 800,
    title: {
      'zh-HK': '域名註冊與爭議仲裁',
      'zh-CN': '域名注册与争议仲裁',
      en: 'Domain Registration & Arbitration',
    },
    shortDescription: {
      'zh-HK': '代辦各類國際頂級域名註冊與權利糾紛解決。',
      'zh-CN': '域名注册与争议仲裁',
      en: 'Registering international and local domains, with dispute resolution and arbitration advisory.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '網絡品牌保護與實體商標同等重要。我們提供各類域名 (如 .com, .com.hk, .cn) 的代理註冊與年度維護。如遇到惡意搶注等侵害品牌權益的事件，我們的法務專家可提供域名仲裁與收回協助。',
      ),
      'zh-CN': createLexicalRichText(
        '网络品牌保护与实体商标同等重要。我们提供各类域名 (如 .com, .com.hk, .cn) 的代理注册与年度维护。如遇到恶意抢注等侵害品牌权益的事件，我们的法务专家可提供域名仲裁与收回协助。',
      ),
      en: createLexicalRichText(
        'Digital brand protection matches physical trademarking in importance. We secure domain extensions (.com, .com.hk, .cn) and defend your brand properties, initiating dispute resolution processes in case of bad faith cybersquatting.',
      ),
    },
  },
  {
    slug: 'ip-management',
    icon: 'award',
    price: 3000,
    title: {
      'zh-HK': '全球知識產權管理方案',
      'zh-CN': '全球知识产权管理方案',
      en: 'IP Management Solutions',
    },
    shortDescription: {
      'zh-HK': '為企業量身定制的知識產權資產評估、監控與轉讓服務。',
      'zh-CN': '全球知识产权管理方案',
      en: 'Tailored IP audits, portfolio monitors, renewals, and formal legal transfer assignments.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '隨著企業的擴張，商標與專利等無形資產需要統一、科學的管理。我們提供長期的商標監視服務、近似查冊監控、知識產權變更、許可使用及轉讓代理，助企業最大化發掘知識產權資產價值。',
      ),
      'zh-CN': createLexicalRichText(
        '随着企业的扩张，商标与专利等无形资产需要统一、科学的管理。我们提供长期的商标监视服务、近似查册监控、知识产权变更、许可使用及转让代理，助企业最大化发掘知识产权资产价值。',
      ),
      en: createLexicalRichText(
        'As enterprises scale, intangible assets like trademarks and patents demand systematic administration. We offer long-term trademark watches, renewal filings, recordals, licensing setups, and assignments.',
      ),
    },
  },
  {
    slug: 'business-search',
    icon: 'file-text',
    price: 1500,
    title: {
      'zh-HK': '商業登記與背景查冊',
      'zh-CN': '商业登记与背景查册',
      en: 'Business Search & Due Diligence',
    },
    shortDescription: {
      'zh-HK': '查詢公司登記冊、股東及董事名冊，出具盡職調查報告。',
      'zh-CN': '商业登记与背景查册',
      en: 'Official company searches, director/shareholder report retrievals, and corporate background checks.',
    },
    content: {
      'zh-HK': createLexicalRichText(
        '在進行商業合作、併購或投資前，核實對方公司的真實身份和資信實力至關重要。我們提供香港公司註冊處 (ICRIS) 官方查冊、商業登記證查詢，並能針對中國內地或海外目標企業出具詳細的工商背景盡職調查報告，規避商業風險。',
      ),
      'zh-CN': createLexicalRichText(
        '在进行商业合作、并购或投资前，核实对方公司的真实身份和资信实力至关重要。我们提供香港公司注册处 (ICRIS) 官方查册、商业登记证查询，并能针对中国内地或海外目标企业出具详细的工商背景尽职调查报告，规避商业风险。',
      ),
      en: createLexicalRichText(
        'Verifying corporate identity and financial standing before starting a joint venture or acquisition is crucial. We offer HK Registry searches and draft professional corporate due diligence reports to eliminate transactional risks.',
      ),
    },
  },
]

// Traditional Chinese Homepage Seed Data
const homeDataHK = {
  slides: [
    {
      title: '成立公司，註冊公司，開公司',
      subtitle: '一站式 公司註冊 公司成立 方案',
      description: '卓遠在香港是一所領先的企業服務有限公司，提供 註冊成立有限公司 服務',
      button1Text: '香港公司註冊',
      button1Link: '/services/hk-company',
      button2Text: '秘書服務',
      button2Link: '/services/company-secretary',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner01.jpg',
    },
    {
      title: '一站式最經濟及高效率的知識產權解決方案',
      subtitle: '',
      description: '卓遠在香港是首十大的知識產權註冊服務代理公司，提供全球性的商標、外觀設計、專利及域名註冊及各服務',
      button1Text: '商標註冊',
      button1Link: '/services/trademark-ip',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner02.jpg',
    },
    {
      title: '價格透明',
      subtitle: '收費均為全包費用',
      description: '網頁內所列出的收費已包括全程官費、代理費、文件費和常規雜費',
      button1Text: '了解更多',
      button1Link: '#about',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner03.jpg',
    },
  ],
  servicesHighlight: [
    {
      title: '香港公司成立',
      bgImage: '/wp-content/uploads/2017/12/accolade-service01.jpg',
      link: '/services/hk-company',
    },
    {
      title: '離岸公司成立',
      bgImage: '/wp-content/uploads/2017/12/accolade-service02-1.jpg',
      link: '/inquiry?service=hk-company',
    },
    {
      title: '辦公室搬遷通知',
      bgImage: '/wp-content/uploads/2018/06/accolade-service03.jpg',
      link: '#about',
    },
  ],
  featuredTitle: '重點服務推介',
  featuredSubtitle: '成立公司 註冊公司 開公司 重點服務推介',
  tabHkTitle: '香港公司成立',
  tabOffshoreTitle: '離岸公司成立',
  tabTrademarkTitle: '商標註冊-熱門註冊司法區',
  hkPlans: [
    {
      title: '基本香港有限公司成立',
      price: '4,550',
      features: [
        { feature: '自訂公司名稱' },
        { feature: '已包含所有政府費用' },
        { feature: '可沿用自己公司地址' },
        { feature: '可沿用自己公司秘書' },
      ],
      inquiryPlanName: '基本香港有限公司成立',
      moreLink: '/services/hk-company',
    },
    {
      title: '基本香港有限公司成立+秘書服務',
      price: '5,538',
      features: [
        { feature: '自訂公司名稱' },
        { feature: '已包含所有政府費用' },
        { feature: '可沿用自己公司地址' },
        { feature: '提供綠盒' },
        { feature: '提供公司秘書服務' },
      ],
      inquiryPlanName: '基本香港有限公司成立加秘書服務',
      moreLink: '/services/company-secretary',
    },
    {
      title: '全包香港有限公司成立',
      price: '6,438',
      features: [
        { feature: '優惠價+ HK$ 800/年享用備存重要控制人登記冊"指定代表"服務。' },
        { feature: '包含基本香港有限公司成立套餐服務' },
        { feature: '提供綠盒' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司秘書服務' },
      ],
      inquiryPlanName: '全包香港有限公司成立',
      moreLink: '/services/hk-company',
    },
    {
      title: '購買香港現成公司',
      price: '7,688',
      features: [
        { feature: '包含基本香港有限公司成立套餐服務' },
        { feature: '從現成公司名單選擇公司名稱' },
        { feature: '提供綠盒' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司秘書服務' },
      ],
      inquiryPlanName: '購買香港現成公司',
      moreLink: '/services/hk-company',
    },
  ],
  offshorePlans: [
    {
      title: '英屬處女群島(BVI)',
      price: '9,800起',
      features: [
        { feature: '無限次公司名稱查冊' },
        { feature: '已包含所有政府費用' },
        { feature: '申請公司註冊證書（CI）' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司註冊代理服務' },
      ],
      inquiryPlanName: '英屬處女群島BVI',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '塞舌爾群島',
      price: '7,000起',
      features: [
        { feature: '無限次公司查冊' },
        { feature: '已包含所有政府費用' },
        { feature: '申請公司註冊證書（CI）' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司註冊代理服務' },
      ],
      inquiryPlanName: '塞舌爾群島',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '薩摩亞',
      price: '7,800起',
      features: [
        { feature: '無限次公司查冊' },
        { feature: '已包含所有政府費用' },
        { feature: '申請公司註冊證書（CI）' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司註冊代理服務' },
      ],
      inquiryPlanName: '薩摩亞',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '開曼群島',
      price: '29,800起',
      features: [
        { feature: '無限次公司查冊' },
        { feature: '已包含所有政府費用' },
        { feature: '申請公司註冊證書（CI）' },
        { feature: '提供借用公司地址服務' },
        { feature: '提供公司註冊代理服務' },
      ],
      inquiryPlanName: '開曼群島',
      moreLink: '/inquiry?service=hk-company',
    },
  ],
  trademarkPlans: [
    {
      title: '香港 商標',
      price: '2,500',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '每額外類別+$1500' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '香港商標',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '中國 商標',
      price: '2,000',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '每額外類別+$2000' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '中國商標',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '台灣 商標',
      price: '4,500',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '每額外類別+$3,500' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '台灣商標',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '新加坡 商標',
      price: '4,000',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '每額外類別+$4,000' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '新加坡商標',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '歐盟 商標',
      price: '11,500',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '第二類別+$1000；第三或之後每額外類別+$2000' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '歐盟商標',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '美國 商標',
      price: '6,500',
      features: [
        { feature: '已包含首類別費用' },
        { feature: '每額外類別+$4,500' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '美國商標',
      moreLink: '/services/trademark-ip',
    },
  ],
  aboutTitle: '公司成立 註冊公司 香港有限公司成立 開公司 一站式方案',
  aboutContent:
    '卓遠企業服務有限公司提供專業 公司成立 服務。價格透明，收費均為全包費用。卓遠在香港是一所領先的企業服務有限公司，提供在岸及離岸 公司註冊 服務及各企業服務。網頁內所列出的 成立公司 收費已包括全程官費、代理費、文件費和常規雜費。',
  whyTitle: '為何選擇在香港 成立公司 註冊公司 ？',
  whyContent:
    '如今許多投資者和企業家選擇在海外，特別是在香港這樣的司法管轄區，註冊公司、開展業務。香港被認為是建立 and 經營企業的最佳城市之一。它擁有良好的戰略位置，富有成效的勞動力，穩定的經濟和政治環境，有吸引力的稅收制度，親商的環境，世界一流的基礎設施 and 有效的法律制度。這些因素對企業的成立和發展至關重要，利於更快地融入國際市場。',
  advantagesTitle: '在香港 註冊公司 公司成立 開展業務的一些主要優勢如下：',
  advantages: [
    {
      title: '香港 公司成立 的有利戰略位置',
      paragraph1:
        '香港地理位置優越，位於亞洲大陸的中心地帶。五到八小時的航班將帶您前往亞太地區的大多數市場。如果您需要進入中國大陸市場，您會發現香港位於中國大陸東南沿海，位於珠江三角洲的兩側。這樣便可在一天內往返香港，北京，上海和中國其他主要城市。',
      paragraph2:
        '香港國際機場（HKIA）是第五個最繁忙的國際客運機場，擁有100家航空公司，服務於180多個目的地，包括亞太，北美，歐洲和中東的主要城市以及中國大陸的約40個目的地。跨境渡輪提供往返六個大陸港口的快速海運服務，而長途汽車服務覆蓋超過90個珠三角城市和城鎮。香港國際機場通常被評為「世界最佳機場」，並一直獲得讚譽和獎項。香港也是中國南方所有海上活動的焦點，並且在使用其設施，處理貨物 and 乘客人數方面的航運噸位方面，它是世界上主要的港口之一。',
    },
    {
      title: '註冊公司 在香港易於做生意',
      paragraph1:
        '香港以建立企業而聞名。您可以在大約兩週的時間在香港完成 公司註冊 。它以其出色的基礎設施 and 商業場所而聞名。嚴格遵守法規，嚴肅對待知識產權保護。企業可以利用各種爭議解決渠道。簡單和商業友好的稅收制度吸引外國投資者到城市。希望在香港 成立公司 開展業務的外國人可以通過申請適當的工作簽證輕鬆搬遷。',
      paragraph2: '',
    },
  ],
  faqTitle: '公司成立 註冊公司 常見問題',
  faqs: [
    { question: '香港有限公司 需要多少名股東?', answer: '最少一名。 股東並無國籍限制，國內及海外人仕均可出任公司股東。' },
    {
      question: '香港私人有限公司需要多少名董事?',
      answer: '最少一名。董事須年滿十八歲，無國籍限制，國內及海外人仕均可出任公司董事。',
    },
    {
      question: '股東和董事有什麼不同？',
      answer:
        '股東是公司的擁有者，出資並按持股比例享有分紅、表決權等；董事由股東選出，負責公司的日常管理與經營決策，需承擔相應的法律責任與管理義務。股東和董事可由同一人擔任。',
    },
    { question: '股東可否兼任董事?', answer: '可以，香港法律允許公司的唯一股東同時出任唯一董事。' },
    { question: '公司註冊資本金是否需要驗資？', answer: '不論註冊資本多少，均不需要驗資。' },
    {
      question: '註冊資本和發行股份有何區別和關係？',
      answer:
        '註冊資本是公司向政府申報登記的最高股本面值。發行股份是實際分配給股東的股本，其總面值不能超過註冊資本。股東的債務清償責任以其已認購的發行股份面值為限。',
    },
    {
      question: '成立香港有限公司需要什麼文件?',
      answer:
        '需要提供：成立公司申請表、盡職調查問卷、全體股東及董事的身份證明文件（身份證或護照）以及近三個月內的有效住址證明（如水電煤費單或銀行對帳單）。',
    },
    {
      question: '如果在香港沒有地址可供註冊辦?',
      answer:
        '您可以借用本公司的註冊地址服務，我們將為您提供符合政府法規的註冊及通訊地址，並代收政府及日常商業信件。',
    },
    {
      question: '香港公司的股東和董事可否全部為非香港居民?',
      answer:
        '可以。香港公司的股東 and 董事並無國籍及居住地限制，任何年滿18歲的非香港居民均可出任股東與董事。但公司必須委任一名香港居民或香港持牌公司作為法定公司秘書。',
    },
  ],
  contactTitle: '與我們聯絡',
  contactDesc:
    '如有任何有關公司成立或企業服務問題，請諮詢我們的專家，我們樂意解答，您可以致電+852 3521 2888 或 電郵至 info@accoladegroup.com.hk',
}

// Simplified Chinese Homepage Seed Data
const homeDataCN = {
  slides: [
    {
      title: '成立公司，注册公司，开公司',
      subtitle: '一站式 公司注册 公司成立 方案',
      description: '卓远在香港是一所领先的企业服务有限公司，提供 注册成立有限公司 服务',
      button1Text: '香港公司注册',
      button1Link: '/services/hk-company',
      button2Text: '秘书服务',
      button2Link: '/services/company-secretary',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner01.jpg',
    },
    {
      title: '一站式最经济及高效率的知识产权解决方案',
      subtitle: '',
      description: '卓远在香港是首十大的知识产权注册服务代理公司，提供全球性的商标、外观设计、专利及域名注册及各服务',
      button1Text: '商标注册',
      button1Link: '/services/trademark-ip',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner02.jpg',
    },
    {
      title: '价格透明',
      subtitle: '收费均为全包费用',
      description: '网页内所列出的收费已包括全程官费、代理费、文件费和常规杂费',
      button1Text: '了解更多',
      button1Link: '#about',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner03.jpg',
    },
  ],
  servicesHighlight: [
    {
      title: '香港公司成立',
      bgImage: '/wp-content/uploads/2017/12/accolade-service01.jpg',
      link: '/services/hk-company',
    },
    {
      title: '离岸公司成立',
      bgImage: '/wp-content/uploads/2017/12/accolade-service02-1.jpg',
      link: '/inquiry?service=hk-company',
    },
    {
      title: '办公室搬迁通知',
      bgImage: '/wp-content/uploads/2018/06/accolade-service03.jpg',
      link: '#about',
    },
  ],
  featuredTitle: '重点服务推介',
  featuredSubtitle: '成立公司 注册公司 开公司 重点服务推介',
  tabHkTitle: '香港公司成立',
  tabOffshoreTitle: '离岸公司成立',
  tabTrademarkTitle: '商标注册-热门注册司法区',
  hkPlans: [
    {
      title: '基本香港有限公司成立',
      price: '4,550',
      features: [
        { feature: '自订公司名称' },
        { feature: '已包含所有政府费用' },
        { feature: '可沿用自己公司地址' },
        { feature: '可沿用自己公司秘书' },
      ],
      inquiryPlanName: '基本香港有限公司成立',
      moreLink: '/services/hk-company',
    },
    {
      title: '基本香港有限公司成立+秘书服务',
      price: '5,538',
      features: [
        { feature: '自订公司名称' },
        { feature: '已包含所有政府费用' },
        { feature: '可沿用自己公司地址' },
        { feature: '提供绿盒' },
        { feature: '提供公司秘书服务' },
      ],
      inquiryPlanName: '基本香港有限公司成立加秘书服务',
      moreLink: '/services/company-secretary',
    },
    {
      title: '全包香港有限公司成立',
      price: '6,438',
      features: [
        { feature: '优惠价+ HK$ 800/年享用备存重要控制人登记册"指定代表"服务。' },
        { feature: '包含基本香港有限公司成立套餐服务' },
        { feature: '提供绿盒' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司秘书服务' },
      ],
      inquiryPlanName: '全包香港有限公司成立',
      moreLink: '/services/hk-company',
    },
    {
      title: '购买香港现成公司',
      price: '7,688',
      features: [
        { feature: '包含基本香港有限公司成立套餐服务' },
        { feature: '从现成公司名单选择公司名称' },
        { feature: '提供绿盒' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司秘书服务' },
      ],
      inquiryPlanName: '购买香港现成公司',
      moreLink: '/services/hk-company',
    },
  ],
  offshorePlans: [
    {
      title: '英属处女群岛(BVI)',
      price: '9,800起',
      features: [
        { feature: '无限次公司名称查册' },
        { feature: '已包含所有政府费用' },
        { feature: '申请公司注册证书（CI）' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司注册代理服务' },
      ],
      inquiryPlanName: '英属处女群岛BVI',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '塞舌尔群岛',
      price: '7,000起',
      features: [
        { feature: '无限次公司查册' },
        { feature: '已包含所有政府费用' },
        { feature: '申请公司注册证书（CI）' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司注册代理服务' },
      ],
      inquiryPlanName: '塞舌尔群岛',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '萨摩亚',
      price: '7,800起',
      features: [
        { feature: '无限次公司查册' },
        { feature: '已包含所有政府费用' },
        { feature: '申请公司注册证书（CI）' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司注册代理服务' },
      ],
      inquiryPlanName: '萨摩亚',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: '开曼群岛',
      price: '29,800起',
      features: [
        { feature: '无限次公司查册' },
        { feature: '已包含所有政府费用' },
        { feature: '申请公司注册证书（CI）' },
        { feature: '提供借用公司地址服务' },
        { feature: '提供公司注册代理服务' },
      ],
      inquiryPlanName: '开曼群岛',
      moreLink: '/inquiry?service=hk-company',
    },
  ],
  trademarkPlans: [
    {
      title: '香港 商标',
      price: '2,500',
      features: [
        { feature: '已包含首类别费用' },
        { feature: '每额外类别+$1500' },
        { feature: '免费查冊费' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '香港商标',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '中国 商标',
      price: '2,000',
      features: [
        { feature: '已包含首类别费用' },
        { feature: '每额外类别+$2000' },
        { feature: '免费查冊费' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '中国商标',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '台湾 商标',
      price: '4,500',
      features: [
        { feature: '已包含首类别费用' },
        { feature: '每额外类别+$3,500' },
        { feature: '免费查冊费' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '台湾商标',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '新加坡 商标',
      price: '4,000',
      features: [
        { feature: '已包含首类别费用' },
        { feature: '每额外类别+$4,000' },
        { feature: '免费查冊费' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '新加坡商标',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '欧盟 商标',
      price: '11,500',
      features: [
        { feature: '已包含首类别费用' },
        { feature: '第二类别+$1000；第三或之后每额外类别+$2000' },
        { feature: '免费查冊费' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '欧盟商标',
      moreLink: '/services/trademark-ip',
    },
    {
      title: '美国 商标',
      price: '6,500',
      features: [
        { feature: '已包含首类别費用' },
        { feature: '每額外類別+$4,500' },
        { feature: '免費查冊費' },
        { feature: '10年有效限期' },
      ],
      inquiryPlanName: '美国商标',
      moreLink: '/services/trademark-ip',
    },
  ],
  aboutTitle: '公司成立 注册公司 香港有限公司成立 开公司 一站式方案',
  aboutContent:
    '卓远企业服务有限公司提供专业 公司成立 服务。价格透明，收费均为全包费用。卓远在香港是一所领先的企业服务有限公司，提供在岸及离岸 公司注册 服务及各企业服务。网页内所列出的 成立公司 收费已包括全程官费、代理费、文件费和常规杂费。',
  whyTitle: '为何选择在香港 成立公司 注册公司 ？',
  whyContent:
    '如今许多投资者和企业家选择在海外，特别是在香港这样的司法管辖区，注册公司、开展业务。香港被认为是建立和经营企业的最佳城市之一。它拥有良好的战略位置，富有成效的劳动力，稳定的经济和政治环境，有吸引力的税收制度，亲商的环境，世界一流 Infrastructure 和有效的法律制度。这些因素对企业的成立和发展至关重要，利于更快地融入国际市场。',
  advantagesTitle: '在香港 注册公司 公司成立 开展业务的一些主要优势如下：',
  advantages: [
    {
      title: '香港 公司成立 的有利战略位置',
      paragraph1:
        '香港地理位置优越，位于亚洲大陆的中心地带。五到八小时的航班将带您前往亚太地区的大多数市场。如果您需要进入中国大陆市场，您会发现香港位于中国大陆东南沿海，位于珠江三角洲的两侧。这样便可在一天内往返香港，北京，上海和中国其他主要城市。',
      paragraph2:
        '香港国际机场（HKIA）是第五個最繁忙的国际客运机场，拥有100家航空公司，服务于180多个目的地，包括亚太，北美，欧洲 and 中东的主要城市以及中国大陆的约40個目的地。跨境渡轮提供往返六個大陆港口的快速海运服务，而长途汽车服务覆盖超过90個珠三角城市和城镇。香港国际机场通常被评为「世界最佳机场」，并一直获得赞誉和奖项。香港也是中国南方所有海上活動的焦点，并且在使用其设施，处理货物 and 乘客人数方面的航运吨位方面，它是世界上主要的港口之一。',
    },
    {
      title: '注册公司 在香港易于做生意',
      paragraph1:
        '香港以建立企业而闻名。您可以在大约两周的時間在香港完成 公司注册 。它以其出色的基础设施和商业场所而闻名。严格遵守法规，严肃对待知识产权保护。企业可以利用各种争议解决渠道。简单和商业友好的税收制度吸引外国投资者到城市。希望在香港 成立公司 开展业务的外国人可以通过申请适当的工作签证轻松搬迁。',
      paragraph2: '',
    },
  ],
  faqTitle: '公司成立 注册公司 常见问题',
  faqs: [
    { question: '香港有限公司 需要多少名股东?', answer: '最少一名。 股东并无国籍限制，国内及海外人仕均可出任公司股东。' },
    {
      question: '香港私人有限公司需要多少名董事?',
      answer: '最少一名。董事须年满十八岁，无国籍限制，国内及海外人仕均可出任公司董事。',
    },
    {
      question: '股东和董事有什么不同？',
      answer:
        '股东是公司的拥有者，出资并按持股比例享有分红、表决权等；董事由股东选出，负责公司的日常管理与经营决策，需承担相应的法律责任与管理义务。股东和董事可由同一人担任。',
    },
    { question: '股东可否兼任董事?', answer: '可以，香港法律允许公司的唯一股东同时出任唯一董事。' },
    { question: '公司注册资本金是否需要验资？', answer: '不论注册资本多少，均不需要验资。' },
    {
      question: '注册资本和发行股份有何区别和关系？',
      answer:
        '注册资本是公司向政府申报登记的最高股本面值。发行股份是实际分配给股东的股本，其总面值不能超过注册资本。股东的债务清偿责任以其已认购的发行股份面值为限。',
    },
    {
      question: '成立香港有限公司需要什么文件?',
      answer:
        '需要提供：成立公司申请表、尽职调查问卷、全体股东及董事的身份证明文件（身份证或护照）以及近三个月内的有效住址证明（如水电煤费单或银行对账单）。',
    },
    {
      question: '如果在香港没有地址可供注册怎么办?',
      answer:
        '您可以借用本公司的注册地址服务，我们将为您提供符合政府法规的注册及通讯地址，并代收政府及日常商业信件。',
    },
    {
      question: '香港公司的股东和董事可否全部为非香港居民?',
      answer:
        '可以。香港公司的股东和董事并无国籍及居住地限制，任何年满18岁的非香港居民均可出任股东与董事。但公司必须委任一名香港居民或香港持牌公司作为法定公司秘书。',
    },
  ],
  contactTitle: '与我们联络',
  contactDesc:
    '如有任何有关公司成立或企业服务问题，请咨询我们的专家，我们乐意解答，您可以致电+852 3521 2888 或 电邮至 info@accoladegroup.com.hk',
}

// English Homepage Seed Data
const homeDataEN = {
  slides: [
    {
      title: 'Incorporate, Register, Setup Company',
      subtitle: 'One-stop Company Setup Solutions',
      description:
        'Accolade is a leading corporate service provider in Hong Kong, offering limited company setup services.',
      button1Text: 'Hong Kong Setup',
      button1Link: '/services/hk-company',
      button2Text: 'Secretary Services',
      button2Link: '/services/company-secretary',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner01.jpg',
    },
    {
      title: 'Cost-effective and High-efficiency Intellectual Property Solutions',
      subtitle: '',
      description:
        'Accolade IP is one of the top ten trademark registration agencies in Hong Kong, offering global trademark, design, patent, and domain registrations.',
      button1Text: 'Trademark Registry',
      button1Link: '/services/trademark-ip',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner02.jpg',
    },
    {
      title: 'Transparent Pricing',
      subtitle: 'All-inclusive Pricing & No Hidden Fees',
      description:
        'All fees listed on our website include government fees, agency fees, document prep fees, and courier mail incidentals.',
      button1Text: 'Learn More',
      button1Link: '#about',
      button2Text: '',
      button2Link: '',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner03.jpg',
    },
  ],
  servicesHighlight: [
    {
      title: 'HK Company Setup',
      bgImage: '/wp-content/uploads/2017/12/accolade-service01.jpg',
      link: '/services/hk-company',
    },
    {
      title: 'Offshore Company Setup',
      bgImage: '/wp-content/uploads/2017/12/accolade-service02-1.jpg',
      link: '/inquiry?service=hk-company',
    },
    {
      title: 'Office Relocation Notice',
      bgImage: '/wp-content/uploads/2018/06/accolade-service03.jpg',
      link: '#about',
    },
  ],
  featuredTitle: 'Featured Services',
  featuredSubtitle: 'Incorporate, Register, Setup Company - Featured Services',
  tabHkTitle: 'HK Company Setup',
  tabOffshoreTitle: 'Offshore Company Setup',
  tabTrademarkTitle: 'Trademark Registry - Top Jurisdictions',
  hkPlans: [
    {
      title: 'Basic HK Limited Company Setup',
      price: '4,550',
      features: [
        { feature: 'Custom Company Name' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'Use Your Own Registered Address' },
        { feature: 'Use Your Own Company Secretary' },
      ],
      inquiryPlanName: 'Basic HK Limited Company Setup',
      moreLink: '/services/hk-company',
    },
    {
      title: 'Basic HK Limited Setup + Secretary',
      price: '5,538',
      features: [
        { feature: 'Custom Company Name' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'Use Your Own Registered Address' },
        { feature: 'Company Green Box Kit Provided' },
        { feature: 'Licensed Local Secretary Provided' },
      ],
      inquiryPlanName: 'Basic HK Limited Setup + Secretary',
      moreLink: '/services/company-secretary',
    },
    {
      title: 'All-inclusive HK Limited Setup',
      price: '6,438',
      features: [
        { feature: 'Special promo +HKD 800/year to keep SCR/Designated Rep records.' },
        { feature: 'Includes Basic HK Company Setup Services' },
        { feature: 'Company Green Box Kit Provided' },
        { feature: 'Registered Central Office Address Provided' },
        { feature: 'Licensed Local Secretary Provided' },
      ],
      inquiryPlanName: 'All-inclusive HK Limited Setup',
      moreLink: '/services/hk-company',
    },
    {
      title: 'Purchase HK Shelf Company',
      price: '7,688',
      features: [
        { feature: 'Includes Basic HK Company Setup Services' },
        { feature: 'Choose Name from Shelf List' },
        { feature: 'Company Green Box Kit Provided' },
        { feature: 'Registered Central Office Address Provided' },
        { feature: 'Licensed Local Secretary Provided' },
      ],
      inquiryPlanName: 'Purchase HK Shelf Company',
      moreLink: '/services/hk-company',
    },
  ],
  offshorePlans: [
    {
      title: 'British Virgin Islands (BVI)',
      price: '9,800+',
      features: [
        { feature: 'Unlimited Name Searches' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'CI Certificate Application' },
        { feature: 'Registered Office Address' },
        { feature: 'Registered Agent Services' },
      ],
      inquiryPlanName: 'BVI Company Setup',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: 'Seychelles',
      price: '7,000+',
      features: [
        { feature: 'Unlimited Searches' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'CI Certificate Application' },
        { feature: 'Registered Office Address' },
        { feature: 'Registered Agent Services' },
      ],
      inquiryPlanName: 'Seychelles Company Setup',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: 'Samoa',
      price: '7,800+',
      features: [
        { feature: 'Unlimited Searches' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'CI Certificate Application' },
        { feature: 'Registered Office Address' },
        { feature: 'Registered Agent Services' },
      ],
      inquiryPlanName: 'Samoa Company Setup',
      moreLink: '/inquiry?service=hk-company',
    },
    {
      title: 'Cayman Islands',
      price: '29,800+',
      features: [
        { feature: 'Unlimited Name Searches' },
        { feature: 'All Official Gov Fees Included' },
        { feature: 'CI Certificate Application' },
        { feature: 'Registered Office Address' },
        { feature: 'Registered Agent Services' },
      ],
      inquiryPlanName: 'Cayman Islands Company Setup',
      moreLink: '/inquiry?service=hk-company',
    },
  ],
  trademarkPlans: [
    {
      title: 'Hong Kong Trademark',
      price: '2,500',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: 'Each Additional Class +$1500' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'Hong Kong Trademark',
      moreLink: '/services/trademark-ip',
    },
    {
      title: 'China Trademark',
      price: '2,000',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: 'Each Additional Class +$2000' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'China Trademark',
      moreLink: '/services/trademark-ip',
    },
    {
      title: 'Taiwan Trademark',
      price: '4,500',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: 'Each Additional Class +$3500' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'Taiwan Trademark',
      moreLink: '/services/trademark-ip',
    },
    {
      title: 'Singapore Trademark',
      price: '4,000',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: 'Each Additional Class +$4000' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'Singapore Trademark',
      moreLink: '/services/trademark-ip',
    },
    {
      title: 'European Union Trademark',
      price: '11,500',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: '2nd Class +$1000; 3rd or more +$2000 each' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'European Union Trademark',
      moreLink: '/services/trademark-ip',
    },
    {
      title: 'United States Trademark',
      price: '6,500',
      features: [
        { feature: 'Includes First Class filing fee' },
        { feature: 'Each Additional Class +$4500' },
        { feature: 'Free Availability Search' },
        { feature: '10 Years Registration Validity' },
      ],
      inquiryPlanName: 'United States Trademark',
      moreLink: '/services/trademark-ip',
    },
  ],
  aboutTitle: 'Company Registry, Incorporation, Setup - One-stop Solutions',
  aboutContent:
    'Accolade Corporate Services Limited provides professional company incorporation services. Our prices are transparent and fully inclusive. We are a leading corporate services company in Hong Kong, providing on-shore and off-shore company registration. The prices shown include all official fees, filing fees, preparation fees, and courier handling fees.',
  whyTitle: 'Why Choose Hong Kong to Register and Set Up Your Company?',
  whyContent:
    'Today, many investors and entrepreneurs choose to set up companies overseas, especially in business-friendly jurisdictions like Hong Kong. HK is recognized as one of the best cities for establishing and running a business. It features a strategic location, productive workforce, economic/political stability, attractive tax regimes, world-class infrastructure, and a trusted common law system.',
  advantagesTitle: 'Key Advantages of Setting Up and Registering a Company in Hong Kong:',
  advantages: [
    {
      title: 'Favorable Strategic Location of Hong Kong',
      paragraph1:
        'Hong Kong is geographically centered in Asia. A 5 to 8-hour flight connects you to most major markets in the Asia-Pacific region. If you need to access Mainland China, HK is perfectly situated on the southeastern coast, right on the Pearl River Delta. This allows same-day return travel to Beijing, Shanghai, and other major Chinese cities.',
      paragraph2:
        'Hong Kong International Airport (HKIA) is one of the busiest international passenger airports, serving over 180 destinations. Cross-border ferries provide high-speed passenger connections to six major ports, and coach services link to 90 PRD cities. HKIA is consistently ranked as the "World\'s Best Airport". HK is also a leading container and maritime shipping port globally.',
    },
    {
      title: 'Ease of Doing Business in Hong Kong',
      paragraph1:
        'Hong Kong is renowned for business ease. You can complete company setup in about two weeks. It features world-class infrastructure, strict compliance guidelines, and rigorous IP rights enforcement. Businesses can resolve issues through independent dispute resolution. A simple and low tax system attracts massive FDI. Foreign nationals can easily relocate by applying for suitable employment visas.',
      paragraph2: '',
    },
  ],
  faqTitle: 'Company Setup & Registration FAQs',
  faqs: [
    {
      question: 'How many shareholders are required for a Hong Kong limited company?',
      answer:
        'At least one. There are no nationality restrictions; individuals from Mainland China or overseas can serve as shareholders.',
    },
    {
      question: 'How many directors are required for a Hong Kong private limited company?',
      answer: 'At least one. Directors must be at least 18 years old, and there are no nationality restrictions.',
    },
    {
      question: 'What is the difference between a shareholder and a director?',
      answer:
        'Shareholders are the owners of the company who invest capital and enjoy dividends/voting rights based on their shareholding. Directors are elected by shareholders to manage the daily operations and make decisions, bearing legal responsibilities. The same person can be both a shareholder and a director.',
    },
    {
      question: 'Can a shareholder also be a director?',
      answer: 'Yes. Hong Kong law allows the sole shareholder of a company to also serve as the sole director.',
    },
    {
      question: 'Is capital verification required for the registered share capital of a HK company?',
      answer: 'No capital verification is required, regardless of the amount of registered share capital.',
    },
    {
      question: 'What documents are required to set up a Hong Kong limited company?',
      answer:
        'You need to provide: incorporation application form, KYC questionnaire, identification documents (ID card or passport) of all shareholders and directors, and a proof of residential address issued within the last 3 months.',
    },
    {
      question: 'What if I do not have a physical address in Hong Kong for registration?',
      answer:
        'You can use our Registered Office Address service. We will provide a compliant address for government registrations and mail handling.',
    },
    {
      question: 'Can all shareholders and directors of a HK company be non-HK residents?',
      answer:
        'Yes. Shareholders and directors do not need to be HK residents. However, the company must appoint a licensed local Company Secretary (either an individual HK resident or a HK corporate body).',
    },
  ],
  contactTitle: 'Contact Us',
  contactDesc:
    'For any questions about company setup or corporate services, please consult our experts. We are happy to help! You can call +852 3521 2888 or email info@accoladegroup.com.hk',
}

const navigationMenuHK = [
  {
    label: '主頁',
    link: '/'
  },
  {
    label: '關於卓遠',
    link: '/about-us',
    subMenuItems: [
      { label: '遠景和核心價值', link: '/about-us' },
      { label: '聯絡我們', link: '/inquiry' }
    ]
  },
  {
    label: '公司註冊',
    link: '/services/hk-company',
    subMenuItems: [
      {
        label: '香港公司註冊',
        link: '/services/hk-company',
        nestedMenuItems: [
          { label: '註冊香港公司文件', link: '/services/hk-company' },
          { label: '註冊香港公司收費', link: '/services/hk-company' }
        ]
      },
      {
        label: '中國公司註冊',
        link: '/services/china-company',
        nestedMenuItems: [
          { label: '註冊中國公司文件', link: '/services/china-company' },
          { label: '註冊中國公司收費', link: '/services/china-company' }
        ]
      },
      {
        label: '新加坡公司註冊',
        link: '/services/singapore-company',
        nestedMenuItems: [
          { label: '註冊新加坡公司文件', link: '/services/singapore-company' },
          { label: '註冊新加坡公司收費', link: '/services/singapore-company' }
        ]
      },
      { label: '英屬處女群島(BVI)註冊', link: '/services/bvi-company' },
      { label: '開曼群島公司註冊', link: '/services/cayman-company' },
      { label: '塞舌爾群島公司註冊', link: '/services/seychelles-company' },
      { label: '薩摩亞公司註冊', link: '/services/samoa-company' },
      { label: '馬紹爾群島公司註冊', link: '/services/marshall-company' },
      { label: '美國公司註冊', link: '/services/us-company' }
    ]
  },
  {
    label: '企業服務',
    link: '/services/company-secretary',
    subMenuItems: [
      { label: '公司秘書服務', link: '/services/company-secretary' },
      { label: '公證服務', link: '/services/notarization' },
      { label: '銀行開戶服務', link: '/services/bank-account' },
      { label: '人力資源及薪資服務', link: '/services/hr-payroll' },
      {
        label: '虛擬辦公室',
        link: '/services/virtual-office',
        nestedMenuItems: [
          { label: '香港虛擬辦公室', link: '/services/virtual-office' },
          { label: '全球通訊服務', link: '/services/global-communication' }
        ]
      }
    ]
  },
  {
    label: '會計稅務',
    link: '/services/accounting-tax'
  },
  {
    label: '知識產權',
    link: '/services/trademark-ip',
    subMenuItems: [
      { label: '商標註冊', link: '/services/trademark-ip' },
      { label: '商標註冊分類', link: '/services/trademark-ip' },
      { label: '商標監察', link: '/services/trademark-watch' },
      { label: '外觀設計註冊', link: '/services/design-registration' },
      { label: '專利註冊', link: '/services/patent-registration' },
      { label: '域名註冊', link: '/services/domain-registration' },
      { label: '知識產權管理', link: '/services/ip-management' }
    ]
  },
  {
    label: '商業查冊',
    link: '/services/business-search'
  },
  {
    label: 'FAQ',
    link: '#faq',
    subMenuItems: [
      { label: '會計及稅務', link: '#faq' },
      { label: '知識產權', link: '#faq' }
    ]
  },
  {
    label: '最新消息',
    link: '/about-us'
  }
]

const navigationMenuCN = [
  {
    label: '主页',
    link: '/'
  },
  {
    label: '关于卓远',
    link: '/about-us',
    subMenuItems: [
      { label: '远景和核心价值', link: '/about-us' },
      { label: '联络我们', link: '/inquiry' }
    ]
  },
  {
    label: '公司注册',
    link: '/services/hk-company',
    subMenuItems: [
      {
        label: '香港公司注册',
        link: '/services/hk-company',
        nestedMenuItems: [
          { label: '注册香港公司文件', link: '/services/hk-company' },
          { label: '注册香港公司收费', link: '/services/hk-company' }
        ]
      },
      {
        label: '中国公司注册',
        link: '/services/china-company',
        nestedMenuItems: [
          { label: '注册中国公司文件', link: '/services/china-company' },
          { label: '注册中国公司收费', link: '/services/china-company' }
        ]
      },
      {
        label: '新加坡公司注册',
        link: '/services/singapore-company',
        nestedMenuItems: [
          { label: '注册新加坡公司文件', link: '/services/singapore-company' },
          { label: '注册新加坡公司收费', link: '/services/singapore-company' }
        ]
      },
      { label: '英属处女群岛(BVI)注册', link: '/services/bvi-company' },
      { label: '开曼群岛公司注册', link: '/services/cayman-company' },
      { label: '塞舌尔群岛公司注册', link: '/services/seychelles-company' },
      { label: '萨摩亚公司注册', link: '/services/samoa-company' },
      { label: '马绍尔群岛公司注册', link: '/services/marshall-company' },
      { label: '美国公司注册', link: '/services/us-company' }
    ]
  },
  {
    label: '企业服务',
    link: '/services/company-secretary',
    subMenuItems: [
      { label: '公司秘书服务', link: '/services/company-secretary' },
      { label: '公证服务', link: '/services/notarization' },
      { label: '银行开户服务', link: '/services/bank-account' },
      { label: '人力资源及薪资服务', link: '/services/hr-payroll' },
      {
        label: '虚拟办公室',
        link: '/services/virtual-office',
        nestedMenuItems: [
          { label: '香港虚拟办公室', link: '/services/virtual-office' },
          { label: '全球通讯服务', link: '/services/global-communication' }
        ]
      }
    ]
  },
  {
    label: '会计税务',
    link: '/services/accounting-tax'
  },
  {
    label: '知识产权',
    link: '/services/trademark-ip',
    subMenuItems: [
      { label: '商标注册', link: '/services/trademark-ip' },
      { label: '商标注册分类', link: '/services/trademark-ip' },
      { label: '商标监察', link: '/services/trademark-watch' },
      { label: '外观设计注册', link: '/services/design-registration' },
      { label: '专利注册', link: '/services/patent-registration' },
      { label: '域名注册', link: '/services/domain-registration' },
      { label: '知识产权管理', link: '/services/ip-management' }
    ]
  },
  {
    label: '商业查册',
    link: '/services/business-search'
  },
  {
    label: 'FAQ',
    link: '#faq',
    subMenuItems: [
      { label: '会计及税务', link: '#faq' },
      { label: '知识产权', link: '#faq' }
    ]
  },
  {
    label: '最新消息',
    link: '/about-us'
  }
]

const navigationMenuEN = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'About Accolade',
    link: '/about-us',
    subMenuItems: [
      { label: 'Vision & Core Values', link: '/about-us' },
      { label: 'Contact Us', link: '/inquiry' }
    ]
  },
  {
    label: 'Company Setup',
    link: '/services/hk-company',
    subMenuItems: [
      {
        label: 'Hong Kong Setup',
        link: '/services/hk-company',
        nestedMenuItems: [
          { label: 'Setup Documents', link: '/services/hk-company' },
          { label: 'Setup Fees', link: '/services/hk-company' }
        ]
      },
      {
        label: 'China Setup',
        link: '/services/china-company',
        nestedMenuItems: [
          { label: 'China Setup Documents', link: '/services/china-company' },
          { label: 'China Setup Fees', link: '/services/china-company' }
        ]
      },
      {
        label: 'Singapore Setup',
        link: '/services/singapore-company',
        nestedMenuItems: [
          { label: 'Singapore Setup Documents', link: '/services/singapore-company' },
          { label: 'Singapore Setup Fees', link: '/services/singapore-company' }
        ]
      },
      { label: 'BVI Incorporation', link: '/services/bvi-company' },
      { label: 'Cayman Setup', link: '/services/cayman-company' },
      { label: 'Seychelles Setup', link: '/services/seychelles-company' },
      { label: 'Samoa Setup', link: '/services/samoa-company' },
      { label: 'Marshall Setup', link: '/services/marshall-company' },
      { label: 'US Setup', link: '/services/us-company' }
    ]
  },
  {
    label: 'Corporate Services',
    link: '/services/company-secretary',
    subMenuItems: [
      { label: 'Company Secretary', link: '/services/company-secretary' },
      { label: 'Notarization', link: '/services/notarization' },
      { label: 'Bank Account Setup', link: '/services/bank-account' },
      { label: 'HR & Payroll Services', link: '/services/hr-payroll' },
      {
        label: 'Virtual Office',
        link: '/services/virtual-office',
        nestedMenuItems: [
          { label: 'HK Virtual Office', link: '/services/virtual-office' },
          { label: 'Global Communication', link: '/services/global-communication' }
        ]
      }
    ]
  },
  {
    label: 'Accounting & Tax',
    link: '/services/accounting-tax'
  },
  {
    label: 'Intellectual Property',
    link: '/services/trademark-ip',
    subMenuItems: [
      { label: 'Trademark Registry', link: '/services/trademark-ip' },
      { label: 'Trademark Classes', link: '/services/trademark-ip' },
      { label: 'Trademark Watch', link: '/services/trademark-watch' },
      { label: 'Design Registration', link: '/services/design-registration' },
      { label: 'Patent Registration', link: '/services/patent-registration' },
      { label: 'Domain Registration', link: '/services/domain-registration' },
      { label: 'IP Management', link: '/services/ip-management' }
    ]
  },
  {
    label: 'Business Search',
    link: '/services/business-search'
  },
  {
    label: 'FAQ',
    link: '#faq',
    subMenuItems: [
      { label: 'Accounting & Tax', link: '#faq' },
      { label: 'Intellectual Property', link: '#faq' }
    ]
  },
  {
    label: 'Latest News',
    link: '/about-us'
  }
]

const inquiryFormSettingsHK = {
  formTitle: '聯絡我們 / 獲取報價',
  formDescription: '請填寫以下表單，我們的專業團隊會於 24 小時內聯絡您。',
  labelName: '您的姓名',
  placeholderName: '請輸入您的姓名',
  labelEmail: '電郵地址',
  placeholderEmail: 'example@email.com',
  labelPhone: '聯絡電話',
  placeholderPhone: '請輸入聯絡電話',
  labelService: '諮詢服務',
  selectEmptyText: '--- 請選擇諮詢服務 ---',
  labelMessage: '詳細需求 / 留言',
  placeholderMessage: '請在此輸入您的留言...',
  submitBtnText: '提交詢價需求',
  submittingText: '正在提交...',
  successTitle: '您的詢價需求已成功送出！',
  successDescription: '感謝您的查詢。我們的合規與商務專員已收到您的需求，將在 1 個工作天內（最快幾小時內）與您聯絡，並為您出具專屬的商業服務方案與報價單。',
  successBackBtnText: '返回首頁',
  serviceHints: [
    { serviceSlug: 'hk-company', hintText: '提示：香港公司最快可在 1 天內完成電子註冊，一般建議同時借用我們的註冊地址及委任我們為法定秘書以確保完全合規。' },
    { serviceSlug: 'company-secretary', hintText: '提示：香港法例規定每家公司必須委派一名公司秘書，我們作為持牌秘書服務商提供全面的週年合規及申報保障。' },
    { serviceSlug: 'accounting-tax', hintText: '提示：新成立的香港公司通常在第 18 個月收到第一份利得稅表，做帳及稅務申報越早規劃越能享受合法的寬減政策。' }
  ]
}

const inquiryFormSettingsCN = {
  formTitle: '联络我们 / 获取报价',
  formDescription: '请填写以下表单，我们的专业团队会于 24 小时内联络您。',
  labelName: '您的姓名',
  placeholderName: '请输入您的姓名',
  labelEmail: '电邮地址',
  placeholderEmail: 'example@email.com',
  labelPhone: '联络电话',
  placeholderPhone: '请输入联络电话',
  labelService: '咨询服务',
  selectEmptyText: '--- 请选择咨询服务 ---',
  labelMessage: '详细需求 / 留言',
  placeholderMessage: '请在此输入您的留言...',
  submitBtnText: '提交询价需求',
  submittingText: '正在提交...',
  successTitle: '您的询价需求已成功送出！',
  successDescription: '感谢您的查询。我们的合规与商务专员已收到您的需求，将在 1 个工作天内（最快几小时内）与您联络，并为您出具专属的商业服务方案与报价单。',
  successBackBtnText: '返回首页',
  serviceHints: [
    { serviceSlug: 'hk-company', hintText: '提示：香港公司最快可在 1 天内完成电子注册，一般建议同时借用我们的注册地址及委任我们为法定秘书以确保完全合规。' },
    { serviceSlug: 'company-secretary', hintText: '提示：香港法例规定每家公司必须委派一名公司秘书，我们作为持牌秘书服务商提供全面的周年合规及申报保障。' },
    { serviceSlug: 'accounting-tax', hintText: '提示：新成立的香港公司通常在第 18 个月收到第一份利得税表，做账及税务申报越早规划越能享受合法的宽免政策。' }
  ]
}

const inquiryFormSettingsEN = {
  formTitle: 'Contact Us / Get a Quote',
  formDescription: 'Please fill out the form below. Our professional team will contact you within 24 hours.',
  labelName: 'Your Name',
  placeholderName: 'Enter your name',
  labelEmail: 'Email Address',
  placeholderEmail: 'example@email.com',
  labelPhone: 'Phone Number',
  placeholderPhone: 'Enter your contact number',
  labelService: 'Inquired Service',
  selectEmptyText: '--- Please select a service ---',
  labelMessage: 'Message / Requirements',
  placeholderMessage: 'Write your detailed requirements here...',
  submitBtnText: 'Submit Inquiry',
  submittingText: 'Submitting...',
  successTitle: 'Inquiry Submitted Successfully!',
  successDescription: 'Thank you for your message. Our corporate consultants have received your request and will follow up within 1 business day with a customized service plan and quotation.',
  successBackBtnText: 'Back to Home',
  serviceHints: [
    { serviceSlug: 'hk-company', hintText: 'Note: HK company setup can be done within 1 day online. We highly recommend using our registered address and company secretarial services to guarantee ongoing compliance.' },
    { serviceSlug: 'company-secretary', hintText: 'Note: HK companies are legally required to appoint a Company Secretary. As a licensed provider, we handle all regular annual return and meeting record compliance.' },
    { serviceSlug: 'accounting-tax', hintText: 'Note: A newly formed HK company will typically receive its first Profits Tax Return 18 months after incorporation. Bookkeeping and planning ahead helps minimize taxes legally.' }
  ]
}

async function seed() {
  console.log('Starting database seeding...')
  const payload = await getPayload({ config })

  // 1. Create Admin User if none exists
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('No users found. Creating default admin user...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@accoladegroup.com.hk',
        password: 'adminpassword123',
      },
    })
    console.log('Admin user created successfully!')
  } else {
    console.log('Admin user already exists.')
  }

  // 2. Create Services (Idempotent)
  console.log('Seeding corporate services...')
  for (const service of servicesData) {
    const existing = await payload.find({
      collection: 'services',
      where: {
        slug: {
          equals: service.slug,
        },
      },
      limit: 1,
    })

    let docId: string | number
    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'services',
        locale: 'zh-HK',
        data: {
          slug: service.slug,
          icon: service.icon,
          price: service.price,
          title: service.title['zh-HK'],
          shortDescription: service.shortDescription['zh-HK'],
          content: service.content['zh-HK'],
          ctaText: (service as any).ctaText ? (service as any).ctaText['zh-HK'] : undefined,
          priceSuffix: (service as any).priceSuffix ? (service as any).priceSuffix['zh-HK'] : undefined,
          isActive: true,
        },
      })
      docId = doc.id
      console.log(`Created service: ${service.slug}`)
    } else {
      docId = existing.docs[0].id
      await payload.update({
        collection: 'services',
        id: docId,
        locale: 'zh-HK',
        data: {
          icon: service.icon,
          price: service.price,
          title: service.title['zh-HK'],
          shortDescription: service.shortDescription['zh-HK'],
          content: service.content['zh-HK'],
          ctaText: (service as any).ctaText ? (service as any).ctaText['zh-HK'] : undefined,
          priceSuffix: (service as any).priceSuffix ? (service as any).priceSuffix['zh-HK'] : undefined,
        },
      })
      console.log(`Updated service (zh-HK): ${service.slug}`)
    }

    // Update for zh-CN
    await payload.update({
      collection: 'services',
      id: docId,
      locale: 'zh-CN',
      data: {
        title: service.title['zh-CN'],
        shortDescription: service.shortDescription['zh-CN'],
        content: service.content['zh-CN'],
        ctaText: (service as any).ctaText ? (service as any).ctaText['zh-CN'] : undefined,
        priceSuffix: (service as any).priceSuffix ? (service as any).priceSuffix['zh-CN'] : undefined,
      },
    })

    // Update for en
    await payload.update({
      collection: 'services',
      id: docId,
      locale: 'en',
      data: {
        title: service.title['en'],
        shortDescription: service.shortDescription['en'],
        content: service.content['en'],
        ctaText: (service as any).ctaText ? (service as any).ctaText['en'] : undefined,
        priceSuffix: (service as any).priceSuffix ? (service as any).priceSuffix['en'] : undefined,
      },
    })
  }

  // 2.5 Seeding General Pages (Idempotent)
  console.log('Seeding general pages...')
  const pagesData = [
    {
      slug: 'about-us',
      title: {
        'zh-HK': '關於我們',
        'zh-CN': '关于我们',
        en: 'About Us',
      },
      shortDescription: {
        'zh-HK': '卓遠企業服務成立於2009年，立足香港，服務全球。',
        'zh-CN': '卓远企业服务成立于2009年，立足香港，服务全球。',
        en: 'Accolade corporate services was established in 2009, based in Hong Kong, serving global businesses.',
      },
      content: {
        'zh-HK': createLexicalBody([
          { type: 'h2', text: '卓遠企業服務有限公司' },
          {
            type: 'p',
            text: '卓遠成立於2009年，我們立足本地，眺望國際，多年來一直爲本地客戶和國際客戶提供一站式、高質量的企業服務及商業方案，是客戶可靠的合作夥伴。卓遠總部位於香港，現已成立北京、新加坡、馬來西亞、澳門和台灣分公司，並在菲律賓、美國、英國、澳大利亞、新西蘭設立代表處，全球員工超過100人。',
          },
          {
            type: 'p',
            text: '作為一所行業領先的知識產權註冊服務代理公司，卓遠能為您提供全球商標、版權、外觀設計、專利、域名註冊等註冊服務。經過十餘年的努力，卓遠在知識產權行業積累了豐富的實踐經驗，組建了一支專業且功底深厚的知識產權專家團隊，是您知識產權保護的信心之選。',
          },
          { type: 'h2', text: '辦理公司成立註冊' },
          {
            type: 'p',
            text: '卓遠還專門為客戶在各主要司法管轄區香港、英屬維京群島(BVI)、薩摩亞、開曼群島、馬來西亞納閩島、塞舌爾群島、美國德拉瓦(特拉華州)、新加坡等辦理公司成立註冊事宜。',
          },
          { type: 'h2', text: '管理及商貿服務' },
          { type: 'li', text: '公司秘書服務' },
          { type: 'li', text: '會計及稅務服務' },
          { type: 'li', text: '虛擬辦公室及通訊地址' },
          { type: 'li', text: '代名股東及專業董事' },
          { type: 'li', text: '中國及國際公證文書服務' },
          { type: 'li', text: '人力資源及薪酬管理' },
          { type: 'li', text: '銀行賬戶代理服務' },
        ]),
        'zh-CN': createLexicalBody([
          { type: 'h2', text: '卓远企业服务有限公司' },
          {
            type: 'p',
            text: '卓远成立于2009年，我们立足本地，眺望国际，多年来一直为本地客户和国际客户提供一站式、高质量的企业服务及商业方案，是客户可靠合作伙伴。卓远总部位于香港，现已成立北京、新加坡、马来西亚、澳门和台湾分公司，并在菲律宾、美国、英国、澳大利亚、新西兰设立代表处，全球员工超过100人。',
          },
          {
            type: 'p',
            text: '作为一所行业领先的知识产权注册服务代理公司，卓远能为您提供全球商标、版权、外观设计、专利、域名注册等注册服务。经过十余年的努力，卓远在知识产权行业积累了丰富的实践经验，组建了一支专业且功底深厚的知识产权专家团队，是您知识产权保护的信心之选。',
          },
          { type: 'h2', text: '办理公司成立注册' },
          {
            type: 'p',
            text: '卓远还专门为客户在各主要司法管辖区香港、英属维京群岛(BVI)、萨摩亚、开曼群岛、马来西亚纳闽岛、塞舌尔群岛、美国德拉瓦(特拉华州)、新加坡等办理公司成立注册事宜。',
          },
          { type: 'h2', text: '管理及商贸服务' },
          { type: 'li', text: '公司秘书服务' },
          { type: 'li', text: '会计及税务服务' },
          { type: 'li', text: '虚拟办公室及通讯地址' },
          { type: 'li', text: '代名股东及专业董事' },
          { type: 'li', text: '中国及国际公证文书服务' },
          { type: 'li', text: '人力资源及薪酬管理' },
          { type: 'li', text: '银行账户代理服务' },
        ]),
        en: createLexicalBody([
          { type: 'h2', text: 'Accolade Corporate Services Limited' },
          {
            type: 'p',
            text: 'Established in 2009, Accolade is based locally with a global outlook, providing one-stop high-quality corporate services and business solutions to local and international clients. Headquartered in Hong Kong, we have branches in Beijing, Singapore, Malaysia, Macau, and Taiwan, and representative offices in the Philippines, US, UK, Australia, and New Zealand, with over 100 staff worldwide.',
          },
          {
            type: 'p',
            text: 'As a leading intellectual property agent, Accolade provides global trademark, copyright, design, patent, and domain name registration. With over a decade of practice, our experienced team of IP specialists is your trusted choice for brand protection.',
          },
          { type: 'h2', text: 'Company Incorporation & Setup' },
          {
            type: 'p',
            text: 'We assist clients in incorporating companies in major jurisdictions including Hong Kong, British Virgin Islands (BVI), Samoa, Cayman Islands, Labuan, Seychelles, US (Delaware), and Singapore.',
          },
          { type: 'h2', text: 'Management & Corporate Support' },
          { type: 'li', text: 'Company Secretary services' },
          { type: 'li', text: 'Accounting and Tax services' },
          { type: 'li', text: 'Virtual Office and Mailing Address' },
          { type: 'li', text: 'Nominee Shareholder & Professional Director' },
          { type: 'li', text: 'China & International Notarization' },
          { type: 'li', text: 'HR and Payroll Management' },
          { type: 'li', text: 'Bank Account Opening Assistance' },
        ]),
      },
    },
    {
      slug: 'inquiry',
      title: {
        'zh-HK': '立即諮詢您的 <span>企業服務</span>',
        'zh-CN': '立即咨询您的 <span>企业服务</span>',
        en: 'Inquire for Your <span>Corporate Services</span>',
      },
      shortDescription: {
        'zh-HK': '填寫表單，我們的專業合規團隊將在 1 個工作天內為您出具專屬的商業服務方案與報價單。',
        'zh-CN': '填写表单，我们的专业合规团队将在 1 个工作天内为您出具专属的商业服务方案与报价单。',
        en: 'Fill out the form. Our professional compliance team will issue a customized business proposal and itemized quotation within 1 business day.',
      },
      badge: {
        'zh-HK': '專業顧問對接',
        'zh-CN': '专业顾问对接',
        en: 'Dedicated Consulting Team',
      },
      features: {
        'zh-HK': [
          { title: '一站式商業顧問', description: '涵蓋註冊公司、會計審計、全球商標等全方位服務。', icon: 'check' },
          { title: '資深合規專家團隊', description: '由香港註冊會計師與公司秘書專家親自為您把關。', icon: 'users' },
          { title: '透明報價・絕無隱藏收費', description: '我們提供公開透明的費用清單，保障您的權益。', icon: 'dollar' },
        ],
        'zh-CN': [
          { title: '一站式商业顾问', description: '涵盖注册公司、会计审计、全球商标等全方位服务。', icon: 'check' },
          { title: '资深合规专家团队', description: '由香港注册会计师与公司秘书专家亲自为您把关。', icon: 'users' },
          { title: '透明报价・绝无隐藏收费', description: '我们提供公开透明的费用清单，保障您的权益。', icon: 'dollar' },
        ],
        en: [
          { title: 'One-Stop Business Consultant', description: 'Covering company incorporation, accounting, auditing, and global trademark registration.', icon: 'check' },
          { title: 'Experienced Compliance Experts', description: 'Supervised directly by Hong Kong Certified Public Accountants (CPAs) and Corporate Secretaries.', icon: 'users' },
          { title: 'Transparent Pricing & No Hidden Fees', description: 'We provide itemized, upfront pricing to ensure absolute peace of mind.', icon: 'dollar' },
        ],
      },
      inquiryFormSettings: {
        'zh-HK': inquiryFormSettingsHK,
        'zh-CN': inquiryFormSettingsCN,
        en: inquiryFormSettingsEN,
      },
    },
  ]

  for (const page of pagesData) {
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: page.slug,
        },
      },
      limit: 1,
    })

    let docId: string | number
    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'pages',
        locale: 'zh-HK',
        data: {
          slug: page.slug,
          title: page.title['zh-HK'],
          shortDescription: page.shortDescription['zh-HK'],
          content: (page as any).content ? (page as any).content['zh-HK'] : undefined,
          badge: (page as any).badge ? (page as any).badge['zh-HK'] : undefined,
          features: (page as any).features ? (page as any).features['zh-HK'] : undefined,
          inquiryFormSettings: (page as any).inquiryFormSettings ? (page as any).inquiryFormSettings['zh-HK'] : undefined,
          isActive: true,
        },
      })
      docId = doc.id
      console.log(`Created page: ${page.slug}`)
    } else {
      docId = existing.docs[0].id
      await payload.update({
        collection: 'pages',
        id: docId,
        locale: 'zh-HK',
        data: {
          title: page.title['zh-HK'],
          shortDescription: page.shortDescription['zh-HK'],
          content: (page as any).content ? (page as any).content['zh-HK'] : undefined,
          badge: (page as any).badge ? (page as any).badge['zh-HK'] : undefined,
          features: (page as any).features ? (page as any).features['zh-HK'] : undefined,
          inquiryFormSettings: (page as any).inquiryFormSettings ? (page as any).inquiryFormSettings['zh-HK'] : undefined,
        },
      })
      console.log(`Updated page (zh-HK): ${page.slug}`)
    }

    // Update for zh-CN
    await payload.update({
      collection: 'pages',
      id: docId,
      locale: 'zh-CN',
      data: {
        title: page.title['zh-CN'],
        shortDescription: page.shortDescription['zh-CN'],
        content: (page as any).content ? (page as any).content['zh-CN'] : undefined,
        badge: (page as any).badge ? (page as any).badge['zh-CN'] : undefined,
        features: (page as any).features ? (page as any).features['zh-CN'] : undefined,
        inquiryFormSettings: (page as any).inquiryFormSettings ? (page as any).inquiryFormSettings['zh-CN'] : undefined,
      },
    })

    // Update for en
    await payload.update({
      collection: 'pages',
      id: docId,
      locale: 'en',
      data: {
        title: page.title['en'],
        shortDescription: page.shortDescription['en'],
        content: (page as any).content ? (page as any).content['en'] : undefined,
        badge: (page as any).badge ? (page as any).badge['en'] : undefined,
        features: (page as any).features ? (page as any).features['en'] : undefined,
        inquiryFormSettings: (page as any).inquiryFormSettings ? (page as any).inquiryFormSettings['en'] : undefined,
      },
    })
  }

  // 3. Setup Site Settings Global
  console.log('Setting up Site Settings global defaults...')

  // zh-HK (Default)
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'zh-HK',
    data: {
      companyName: '卓遠集團 ACCOLADE',
      logoText: 'ACCOLADE',
      email: 'info@accoladegroup.com.hk',
      phone: '+852 3521 2888',
      whatsapp: 'https://wa.me/85235212888',
      whatsappDisplay: '+852 9428 9422',
      hkAddress: '香港上環皇后大道中181號大新行24樓06室',
      szAddress: '深圳市福田區深南大道2008號嘉里建設廣場2座15樓',
      szPhone: '+86 755 8888 8888',
      szWhatsapp: 'https://wa.me/8613800000000',
      beijingAddress: '北京市朝陽區光華東裡8號中海廣場南樓2層216室',
      singaporeAddress: '10 Anson Road #35-03A International Plaza Singapore 079903',
      licenseText: '牌照編號:TC000447',
      licenseLink: '/wp-content/uploads/2024/06/ACSL_TCSP-Licence-2024-2027.pdf',
      priceLabel: '服務費用',
      serviceCtaFallback: '立即聯絡顧問諮詢',
      backToHomeLabel: '返回首頁',
      inquireMoreLabel: '查詢更多',
      addToCartLabel: 'Add to Cart 購買',
      learnMoreLabel: '了解更多',
      navigationMenu: navigationMenuHK,
    },
  })

  // zh-CN
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'zh-CN',
    data: {
      companyName: '卓远集团 ACCOLADE',
      hkAddress: '香港上环皇后大道中181号大新行24楼06室',
      szAddress: '深圳市福田区深南大道2008号 Kerry Plaza 2座15楼',
      whatsappDisplay: '+852 9428 9422',
      szPhone: '+86 755 8888 8888',
      szWhatsapp: 'https://wa.me/8613800000000',
      beijingAddress: '北京市朝阳区光华东里8号中海广场南楼2层216室',
      singaporeAddress: '10 Anson Road #35-03A International Plaza Singapore 079903',
      licenseText: '牌照编号:TC000447',
      licenseLink: '/wp-content/uploads/2024/06/ACSL_TCSP-Licence-2024-2027.pdf',
      priceLabel: '服务费用',
      serviceCtaFallback: '立即联络顾问咨询',
      backToHomeLabel: '返回首页',
      inquireMoreLabel: '查询更多',
      addToCartLabel: 'Add to Cart 购买',
      learnMoreLabel: '了解更多',
      navigationMenu: navigationMenuCN,
    },
  })

  // en
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      companyName: 'ACCOLADE GROUP',
      hkAddress: "Unit 2406, 24/F, Grand Millennium Plaza, 181 Queen's Road Central, Sheung Wan, Hong Kong",
      szAddress: '15/F, Tower 2, Kerry Plaza, 2008 Shennan Boulevard, Futian District, Shenzhen, China',
      whatsappDisplay: '+852 9428 9422',
      szPhone: '+86 755 8888 8888',
      szWhatsapp: 'https://wa.me/8613800000000',
      beijingAddress: 'Room 216, 2/F, South Tower, China Overseas Plaza, 8 Guanghua Dongli, Chaoyang District, Beijing, China',
      singaporeAddress: '10 Anson Road #35-03A International Plaza Singapore 079903',
      licenseText: 'Licence No:TC000447',
      licenseLink: '/wp-content/uploads/2024/06/ACSL_TCSP-Licence-2024-2027.pdf',
      priceLabel: 'Service Fee',
      serviceCtaFallback: 'Contact Consultant Now',
      backToHomeLabel: 'Back to Home',
      inquireMoreLabel: 'Inquire More',
      addToCartLabel: 'Add to Cart',
      learnMoreLabel: 'Learn More',
      navigationMenu: navigationMenuEN,
    },
  })

  console.log('Site settings seeded successfully!')

  // 4. Setup Home Page Settings Global
  console.log('Setting up Home Page Settings global defaults...')
  // zh-HK
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'zh-HK',
    data: homeDataHK,
  })
  // zh-CN
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'zh-CN',
    data: homeDataCN,
  })
  // en
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: homeDataEN,
  })

  console.log('Home Page Settings seeded successfully!')
  console.log('Database seeding finished!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error during seeding:')
  console.dir(err, { depth: null })
  process.exit(1)
})
