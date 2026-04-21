//@ts-nocheck
//@eslint-disable
'use client'
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// ── BRAND THEME ──────────────────────────────────────────────────────────────
const B = {
  red:"#CC0000", redD:"#990000", redL:"#FF1A1A",
  blue:"#1B75BC", blueD:"#0D4F8A", blueL:"#3A9DE0",
  dark:"#0A1128", darkL:"#111D3A",
  bg:"#F5F7FF", card:"#FFFFFF",
  text:"#0A1128", muted:"#6B7A99", border:"#E2E8FF",
  green:"#059669", warn:"#F59E0B", gold:"#F59E0B",
  accent:"#00C896",
};

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const MONTHLY = [
  {m:"Jan",commission:48200,activations:162,techs:38},{m:"Feb",commission:61400,activations:204,techs:45},
  {m:"Mar",commission:55800,activations:187,techs:47},{m:"Apr",commission:72300,activations:241,techs:52},
  {m:"May",commission:68900,activations:229,techs:55},{m:"Jun",commission:84100,activations:281,techs:61},
  {m:"Jul",commission:79500,activations:265,techs:63},{m:"Aug",commission:91200,activations:304,techs:68},
  {m:"Sep",commission:88700,activations:296,techs:70},{m:"Oct",commission:96400,activations:321,techs:74},
  {m:"Nov",commission:104200,activations:347,techs:78},{m:"Dec",commission:112800,activations:376,techs:82},
];
const AREAS = [
  {d:"Dhaka",t:24,pts:142000,acts:473,c:"#CC0000"},{d:"Chittagong",t:18,pts:108000,acts:360,c:"#1B75BC"},
  {d:"Sylhet",t:12,pts:72000,acts:240,c:"#059669"},{d:"Rajshahi",t:10,pts:60000,acts:200,c:"#F59E0B"},
  {d:"Khulna",t:8,pts:48000,acts:160,c:"#7C3AFF"},{d:"Cumilla",t:7,pts:42000,acts:140,c:"#0891B2"},
  {d:"Barisal",t:6,pts:36000,acts:120,c:"#EC4899"},{d:"Others",t:15,pts:90000,acts:300,c:"#9AA5BE"},
];
const PRODUCTS = [
  {m:"VSOL V1600G-2",type:"WiFi 6 AX3000 ONU",price:5800,pts:160,units:312,c:"#CC0000"},
  {m:"VSOL V1600G1", type:"WiFi 6 Router ONU", price:4200,pts:120,units:487,c:"#1B75BC"},
  {m:"VSOL V2804RGW",type:"4-Port GPON ONU",   price:3900,pts:110,units:241,c:"#059669"},
  {m:"VSOL V2804G",  type:"4-Port GPON Pro",    price:3600,pts:100,units:198,c:"#F59E0B"},
  {m:"VSOL V2802RGW",type:"GPON ONU Router",    price:2800,pts:80, units:362,c:"#7C3AFF"},
  {m:"VSOL V2802D",  type:"EPON ONU Router",    price:2100,pts:70, units:167,c:"#0891B2"},
  {m:"VSOL V2801RGW",type:"ONU Router Basic",   price:1900,pts:60, units:289,c:"#EC4899"},
  {m:"VSOL V2801G",  type:"GPON ONU Basic",     price:1600,pts:50, units:203,c:"#D97706"},
  {m:"VSOL V1200G",  type:"WiFi 5 ONU",         price:1200,pts:40, units:145,c:"#6B7A99"},
  {m:"VSOL V1000G",  type:"Single-Port ONU",    price:900, pts:30, units:118,c:"#0A1128"},
];
const TECH_LB = [
  {r:1, name:"Kamal Net",       isp:"NetBD Holdings",  d:"Chittagong",pts:29400,prize:"Cox's Bazar Trip",   cash:22000},
  {r:2, name:"Dhaka Speed ISP", isp:"NetBD Holdings",  d:"Dhaka",     pts:24100,prize:"iPhone 15 Pro",      cash:18000},
  {r:3, name:"Sky Link BD",     isp:"SylhetNet Group", d:"Sylhet",    pts:18800,prize:"55\" Smart TV",       cash:14000},
  {r:4, name:"Fast Net Ctg",    isp:"Ctg Fiber",       d:"Chittagong",pts:16400,prize:"Samsung Tab S9",     cash:12000},
  {r:5, name:"Rahim Telecom",   isp:"RajNet ISP",      d:"Dhaka",     pts:16200,prize:"Samsung Tab S9",     cash:12000},
  {r:6, name:"Cumilla Link",    isp:"CumillaLink",     d:"Cumilla",   pts:11500,prize:"Galaxy Watch 6",     cash:8000},
  {r:7, name:"GreenNet BD",     isp:"RajNet ISP",      d:"Rajshahi",  pts:11300,prize:"Galaxy Watch 6",     cash:8000},
  {r:8, name:"BroadEx ISP",     isp:"KhulnaCon",       d:"Khulna",    pts:11100,prize:"Galaxy Watch 6",     cash:8000},
  {r:9, name:"NetPro Barisal",  isp:"BarisalNet",      d:"Barisal",   pts:10900,prize:"Galaxy Watch 6",     cash:8000},
  {r:10,name:"ConnectX Mym",   isp:"MymenNet",        d:"Mymensingh",pts:10700,prize:"Galaxy Watch 6",     cash:8000},
  ...Array.from({length:10},(_,i)=>({r:i+11,name:`Technician ${i+11}`,isp:"Various",d:"Various",pts:8400-i*120,prize:"BT Speaker Set",cash:5000})),
];
const ISP_LB = [
  {r:1,isp:"NetBD Holdings",   d:"Dhaka",      t:8, pts:94200,prize:"Corporate Trophy + BDT 50,000"},
  {r:2,isp:"Chittagong Fiber", d:"Chittagong", t:6, pts:78400,prize:"Corporate Trophy + BDT 35,000"},
  {r:3,isp:"SylhetNet Group",  d:"Sylhet",     t:5, pts:61200,prize:"Corporate Trophy + BDT 25,000"},
  {r:4,isp:"RajNet ISP",       d:"Rajshahi",   t:4, pts:52800,prize:"Corporate Trophy + BDT 15,000"},
  {r:5,isp:"KhulnaCon ISP",    d:"Khulna",     t:4, pts:48100,prize:"Corporate Trophy + BDT 10,000"},
  {r:6,isp:"CumillaLink",      d:"Cumilla",    t:3, pts:39400,prize:"—"},
  {r:7,isp:"FastFiber BD",     d:"Bogura",     t:3, pts:36200,prize:"—"},
  {r:8,isp:"BarisalNet",       d:"Barisal",    t:2, pts:28800,prize:"—"},
];
const SIGNUPS = [
  {id:1,name:"Baraka Net",   phone:"01711-445566",d:"Cumilla",    isp:"Baraka Telecom",  license:"BTRC-2024-8821",ref_owner:"Mr. Karim",ref_phone:"01711-000001",date:"Apr 19",status:"pending"},
  {id:2,name:"SkyWave ISP",  phone:"01833-112233",d:"Khulna",     isp:"SkyWave Telecom", license:"BTRC-2024-9910",ref_owner:"Mr. Rahim",ref_phone:"01833-000002",date:"Apr 18",status:"pending"},
  {id:3,name:"TurboNet",     phone:"01922-667788",d:"Sylhet",     isp:"TurboNet BD",     license:"BTRC-2024-7741",ref_owner:"Mr. Hasan",ref_phone:"01922-000003",date:"Apr 17",status:"pending"},
  {id:4,name:"CityLink",     phone:"01615-998877",d:"Rajshahi",   isp:"CityLink ISP",    license:"BTRC-2024-5530",ref_owner:"Mr. Faruk",ref_phone:"01615-000004",date:"Apr 16",status:"approved"},
  {id:5,name:"SpeedX Bogura",phone:"01744-334455",d:"Bogura",     isp:"SpeedX BD",       license:"BTRC-2024-4421",ref_owner:"Mr. Nabil",ref_phone:"01744-000005",date:"Apr 15",status:"rejected"},
  {id:6,name:"NexGen",       phone:"01511-223344",d:"Tangail",    isp:"NexGen Fiber",    license:"BTRC-2024-3312",ref_owner:"Mr. Sohel",ref_phone:"01511-000006",date:"Apr 14",status:"approved"},
];
const CLAIMS = [
  {id:1,name:"Kamal Net",      r:1, prize:"Cox's Bazar Trip",cash:22000,bkash:"01711-123456",date:"Apr 19",status:"pending"},
  {id:2,name:"Dhaka Speed ISP",r:2, prize:"iPhone 15 Pro",   cash:18000,bkash:"01833-654321",date:"Apr 18",status:"pending"},
  {id:3,name:"Sky Link BD",    r:3, prize:"55\" Smart TV",    cash:14000,bkash:"01922-987654",date:"Apr 17",status:"approved"},
  {id:4,name:"Fast Net Ctg",   r:4, prize:"Samsung Tab S9",  cash:12000,bkash:"01615-456789",date:"Apr 16",status:"approved"},
  {id:5,name:"Rahim Telecom",  r:5, prize:"Samsung Tab S9",  cash:12000,bkash:"01744-321654",date:"Apr 15",status:"pending"},
];
const MY_RANK=5; const MY_PTS=16200;
const CLAIM_METHODS=[{n:"bKash",v:78,c:"#E2136E"},{n:"Physical",v:22,c:"#1B75BC"}];

// ── SVG LOGOS ────────────────────────────────────────────────────────────────
function RasaLogo({h=40}) {
  return (
    <svg height={h} viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 18 C38 18,52 8,58 22 C64 36,52 52,38 48 C30 44,20 30,38 18Z" fill="#CC0000"/>
      <path d="M38 48 C38 48,55 52,58 66 C61 78,46 84,36 76 C28 70,22 56,38 48Z" fill="#CC0000" opacity="0.85"/>
      <path d="M38 48 C38 48,18 48,12 36 C6 24,16 10,28 14 C38 18,40 36,38 48Z" fill="#CC0000" opacity="0.7"/>
      <circle cx="38" cy="48" r="5" fill="#CC0000"/>
      <rect x="78" y="4" width="238" height="68" rx="5" fill="#1B75BC"/>
      <text x="88" y="50" fill="white" fontSize="42" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="-1">RASA</text>
      <text x="88" y="64" fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily="Arial,sans-serif" letterSpacing="2">TECHNOLOGIES</text>
      <text x="88" y="82" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Arial,sans-serif">YOUR NETWORK PARTNER</text>
    </svg>
  );
}
function VSOLBadge({h=28}) {
  return (
    <svg height={h} viewBox="0 0 90 30" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="15" cy="13" rx="10" ry="11" fill="#CC0000"/>
      <path d="M10 10 Q15 6 20 10 Q15 14 10 10Z" fill="white" opacity="0.9"/>
      <path d="M9 14 Q15 18 21 14 Q15 10 9 14Z" fill="white" opacity="0.7"/>
      <text x="30" y="18" fill="#0A3D0A" fontSize="16" fontWeight="900" fontFamily="Arial,sans-serif">V·SOL</text>
    </svg>
  );
}

// ── SHARED UI ────────────────────────────────────────────────────────────────
const pill=(color: string, label: string, sm?: boolean)=>(
  <span style={{background:color+"18",color,fontSize:sm?10:11,fontWeight:700,padding:sm?"2px 8px":"4px 12px",borderRadius:20,border:`1px solid ${color}33`,whiteSpace:"nowrap"}}>{label}</span>
);
function KPI({icon,label,value,sub,color,trend}: {icon: string; label: string; value: string; sub?: string; color?: string; trend?: string}) {
  return (
    <div style={{background:B.card,borderRadius:16,padding:"18px 20px",border:`1px solid ${B.border}`,boxShadow:"0 2px 12px rgba(0,0,0,0.05)",flex:1,minWidth:160}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <div style={{color:B.muted,fontSize:12,fontWeight:600,marginBottom:5}}>{label}</div>
          <div style={{fontSize:22,fontWeight:900,color:color||B.text,lineHeight:1}}>{value}</div>
          {sub&&<div style={{color:B.muted,fontSize:11,marginTop:4}}>{sub}</div>}
          {trend&&<div style={{color:B.green,fontSize:11,fontWeight:700,marginTop:3}}>↑ {trend}</div>}
        </div>
        <div style={{width:42,height:42,background:(color||B.blue)+"18",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{icon}</div>
      </div>
    </div>
  );
}
function Card({children,title,sub,style:s}: {children: React.ReactNode; title?: string; sub?: string; style?: React.CSSProperties}) {
  return (
    <div style={{background:B.card,borderRadius:16,border:`1px solid ${B.border}`,boxShadow:"0 2px 12px rgba(0,0,0,0.05)",...s}}>
      {title&&<div style={{padding:"16px 20px",borderBottom:`1px solid ${B.border}`}}>
        <div style={{fontSize:14,fontWeight:800,color:B.text}}>{title}</div>
        {sub&&<div style={{fontSize:12,color:B.muted,marginTop:2}}>{sub}</div>}
      </div>}
      <div style={{padding:"16px 20px"}}>{children}</div>
    </div>
  );
}
function Btn({label,onClick,color,outline,sm,full}: {label: string; onClick?: () => void; color?: string; outline?: boolean; sm?: boolean; full?: boolean}) {
  const bg=outline?"transparent":(color||B.red);
  const cl=outline?(color||B.red):"#fff";
  const bd=outline?`2px solid ${color||B.red}`:`2px solid ${bg}`;
  return <button onClick={onClick} style={{width:full?"100%":"auto",padding:sm?"8px 16px":"11px 22px",background:bg,color:cl,border:bd,borderRadius:10,fontSize:sm?12:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"opacity 0.15s"}}>{label}</button>;
}
function Input({label,placeholder,type="text",value,onChange,icon,required}: {label?: string; placeholder?: string; type?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; icon?: string; required?: boolean}) {
  return (
    <div style={{marginBottom:14}}>
      {label&&<label style={{fontSize:13,fontWeight:600,color:B.text,display:"block",marginBottom:5}}>{label}{required&&<span style={{color:B.red}}> *</span>}</label>}
      <div style={{position:"relative"}}>
        {icon&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{icon}</span>}
        <input type={type} placeholder={placeholder} value={value||""} onChange={onChange}
          style={{width:"100%",boxSizing:"border-box",padding:icon?"11px 14px 11px 40px":"11px 14px",borderRadius:10,border:`1.5px solid ${B.border}`,fontSize:14,color:B.text,background:"#FAFBFF",outline:"none",fontFamily:"inherit"}}/>
      </div>
    </div>
  );
}
function ApproveRejectBtns({row,onUpdate}: {row: any; onUpdate: (id: number, status: string) => void}) {
  if(row.status==="approved") return pill(B.green,"✓ Approved",true);
  if(row.status==="rejected") return pill(B.red,"✗ Rejected",true);
  return <div style={{display:"flex",gap:6}}>
    <button onClick={()=>onUpdate(row.id,"approved")} style={{background:B.green+"15",border:`1px solid ${B.green}`,color:B.green,borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓ Approve</button>
    <button onClick={()=>onUpdate(row.id,"rejected")} style={{background:B.red+"15",border:`1px solid ${B.red}`,color:B.red,borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✗ Reject</button>
  </div>;
}

// ── SHARED LEADERBOARDS & PRODUCT TABLE ──────────────────────────────────────
function TechLeaderboard() {
  const [search,setSearch]=useState("");
  const shown=TECH_LB.filter(l=>!search||l.name.toLowerCase().includes(search.toLowerCase())||l.d.toLowerCase().includes(search.toLowerCase()));
  const rBg=(r: number)=>r===1?"linear-gradient(135deg,#FFD700,#FFA500)":r===2?"linear-gradient(135deg,#C0C0C0,#909090)":r===3?"linear-gradient(135deg,#CD7F32,#A05020)":r<=10?`linear-gradient(135deg,${B.red},${B.redD})`:r<=50?`linear-gradient(135deg,${B.blue},${B.blueD})`:"linear-gradient(135deg,#9AA5BE,#6B7A99)";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,${B.dark},${B.blue})`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>🏅 Technician Champion Leaderboard</div>
        <div style={{opacity:.8,fontSize:13}}>Individual rankings · 1 Point = BDT 1 Commission · Top 50 win prizes</div>
      </div>
      {/* Podium */}
      <Card>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:16,paddingBottom:8}}>
          {[1,0,2].map(idx=>{
            const l=TECH_LB[idx];
            const medal=["🥈","🥇","🥉"][idx];
            const ht=[90,120,70];
            const bg=["linear-gradient(180deg,#E0E0E0,#B0B0B0)","linear-gradient(180deg,#FFE066,#FFD700)","linear-gradient(180deg,#DFA060,#CD7F32)"];
            return <div key={idx} style={{textAlign:"center",flex:1}}>
              <div style={{fontSize:idx===1?36:26,marginBottom:4}}>{medal}</div>
              <div style={{background:bg[idx],borderRadius:"12px 12px 0 0",padding:"12px 6px 8px",minHeight:ht[idx],display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",boxShadow:idx===1?"0 4px 20px #FFD70055":"none"}}>
                <div style={{fontSize:12,fontWeight:800,color:idx===1?"#5A3A00":"#333",lineHeight:1.3}}>{l.name}</div>
                <div style={{fontSize:11,color:idx===1?"#7A5500":"#666",marginTop:2}}>{l.pts.toLocaleString()} pts</div>
              </div>
            </div>;
          })}
        </div>
        <div style={{display:"flex",gap:16,height:12}}>{[1,0,2].map(i=><div key={i} style={{flex:1,background:["#C0C0C0","#FFD700","#CD7F32"][i],borderRadius:"0 0 8px 8px"}}/>)}</div>
      </Card>
      <Card title="🔍 Full Top 100 Rankings">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or district…"
          style={{width:"100%",boxSizing:"border-box",padding:"10px 16px",borderRadius:10,border:`1.5px solid ${B.border}`,fontSize:13,color:B.text,background:"#FAFBFF",outline:"none",fontFamily:"inherit",marginBottom:14}}/>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["Rank","Technician","ISP","District","Points","Min Req.","Prize","Cash Value"].map(h=>(
                <th key={h} style={{padding:"10px 12px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{shown.map((l,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${B.border}`,background:l.r<=50?"#FFF5F5":i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"10px 12px"}}><div style={{width:30,height:30,background:rBg(l.r),borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:l.r<=3?14:11,fontWeight:900,color:"#fff"}}>{l.r<=3?["🥇","🥈","🥉"][l.r-1]:`#${l.r}`}</div></td>
                <td style={{padding:"10px 12px",fontWeight:700,color:B.text}}>{l.name}</td>
                <td style={{padding:"10px 12px",color:B.muted,fontSize:12}}>{l.isp}</td>
                <td style={{padding:"10px 12px"}}>{pill(B.blue,l.d,true)}</td>
                <td style={{padding:"10px 12px",fontWeight:900,color:B.red}}>{l.pts.toLocaleString()}</td>
                <td style={{padding:"10px 12px",color:B.muted,fontSize:12}}>{l.pts.toLocaleString()}</td>
                <td style={{padding:"10px 12px",fontSize:12,color:B.text}}>{l.prize}</td>
                <td style={{padding:"10px 12px",fontWeight:800,color:B.green}}>BDT {l.cash.toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ISPLeaderboard() {
  const [search,setSearch]=useState("");
  const shown=ISP_LB.filter(l=>!search||l.isp.toLowerCase().includes(search.toLowerCase())||l.d.toLowerCase().includes(search.toLowerCase()));
  const rBg=(r: number)=>r===1?"linear-gradient(135deg,#FFD700,#FFA500)":r===2?"linear-gradient(135deg,#C0C0C0,#909090)":r===3?"linear-gradient(135deg,#CD7F32,#A05020)":r<=5?`linear-gradient(135deg,${B.red},${B.redD})`:"linear-gradient(135deg,#9AA5BE,#6B7A99)";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,#065F46,#059669)`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>🏭 ISP Champion Leaderboard</div>
        <div style={{opacity:.8,fontSize:13}}>Combined points of all technicians under each ISP · Top 5 ISPs win corporate rewards</div>
      </div>
      <Card title="🎖️ ISP Prize Tiers — Top 5">
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[["🥇 #1","BDT 50,000 + Trophy","#FFD700"],["🥈 #2","BDT 35,000 + Trophy","#C0C0C0"],["🥉 #3","BDT 25,000 + Trophy","#CD7F32"],["🎖️ #4","BDT 15,000 + Trophy",B.blue],["🏅 #5","BDT 10,000 + Trophy",B.green]].map(([r,p,c])=>(
            <div key={r} style={{background:c+"15",border:`1.5px solid ${c}44`,borderRadius:12,padding:"10px 14px",flex:1,minWidth:120}}>
              <div style={{fontWeight:800,fontSize:13,color:c}}>{r}</div>
              <div style={{fontSize:12,color:B.text,marginTop:3,fontWeight:600}}>{p}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="📊 ISP Points Comparison">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={ISP_LB.slice(0,6).map(l=>({name:l.isp.split(" ")[0],pts:Math.round(l.pts/1000)}))} margin={{top:5,right:5,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
            <XAxis dataKey="name" tick={{fontSize:10,fill:B.muted}}/>
            <YAxis tick={{fontSize:10,fill:B.muted}} tickFormatter={v=>`${v}K`}/>
            <Tooltip formatter={(v)=>[`${v}K pts`,"Points"]}/>
            <Bar dataKey="pts" radius={[6,6,0,0]}>
              {ISP_LB.slice(0,6).map((_,i)=><Cell key={i} fill={[B.red,"#C0C0C0","#CD7F32",B.blue,B.green,"#9AA5BE"][i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="📋 Full ISP Rankings">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search ISP or district…"
          style={{width:"100%",boxSizing:"border-box",padding:"10px 16px",borderRadius:10,border:`1.5px solid ${B.border}`,fontSize:13,color:B.text,background:"#FAFBFF",outline:"none",fontFamily:"inherit",marginBottom:14}}/>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["Rank","ISP Name","HQ","Techs","Total Pts","Avg/Tech","Prize"].map(h=>(
                <th key={h} style={{padding:"10px 12px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{shown.map((l,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${B.border}`,background:l.r<=5?"#F0FFF8":i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"10px 12px"}}><div style={{width:30,height:30,background:rBg(l.r),borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:l.r<=3?14:11,fontWeight:900,color:"#fff"}}>{l.r<=3?["🥇","🥈","🥉"][l.r-1]:`#${l.r}`}</div></td>
                <td style={{padding:"10px 12px",fontWeight:700,color:B.text}}>{l.isp}</td>
                <td style={{padding:"10px 12px"}}>{pill(B.blue,l.d,true)}</td>
                <td style={{padding:"10px 12px",color:B.muted}}>{l.t}</td>
                <td style={{padding:"10px 12px",fontWeight:900,color:B.red}}>{l.pts.toLocaleString()}</td>
                <td style={{padding:"10px 12px",color:B.muted}}>{Math.round(l.pts/l.t).toLocaleString()}</td>
                <td style={{padding:"10px 12px",fontSize:12}}>{l.r<=5?pill(l.r<=3?"#F59E0B":B.green,l.prize.replace("Corporate Trophy + ",""),true):<span style={{color:B.muted}}>—</span>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductReference() {
  const maxP=Math.max(...PRODUCTS.map(p=>p.price));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,#4C1D95,#7C3AFF)`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>📦 Product Points Reference Table</div>
        <div style={{opacity:.8,fontSize:13}}>Higher retail price = Higher commission points · Formula: Points = Round(Price ÷ 36.25)</div>
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <Card style={{flex:2,minWidth:280}}>
          <div style={{fontSize:13,fontWeight:800,color:B.text,marginBottom:12}}>📊 Points by Model</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[...PRODUCTS].sort((a,b)=>a.pts-b.pts).map(p=>({n:p.m.replace("VSOL ",""),pts:p.pts}))} margin={{top:0,right:0,bottom:20,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
              <XAxis dataKey="n" tick={{fontSize:9,fill:B.muted}} angle={-25} textAnchor="end"/>
              <YAxis tick={{fontSize:10,fill:B.muted}}/>
              <Tooltip formatter={v=>[`${v} pts`,"Points"]}/>
              <Bar dataKey="pts" radius={[4,4,0,0]}>
                {[...PRODUCTS].sort((a,b)=>a.pts-b.pts).map((p,i)=><Cell key={i} fill={p.c}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{flex:1,minWidth:200}}>
          <div style={{fontSize:13,fontWeight:800,color:B.text,marginBottom:12}}>🧮 Formula</div>
          <div style={{background:"#F5F3FF",borderRadius:12,padding:14,marginBottom:12}}>
            <div style={{fontFamily:"monospace",fontSize:13,color:"#4C1D95",fontWeight:700}}>pts = ⌊Price ÷ 36.25⌋</div>
            <div style={{fontSize:11,color:B.muted,marginTop:6}}>Prize ≤ 75% of total pts earned. Rasa keeps ≥ 25% margin.</div>
          </div>
          <div style={{fontSize:12,color:B.muted,lineHeight:1.7}}>• 1 Point = BDT 1 commission<br/>• Paid monthly after approval<br/>• Points set by Super Admin<br/>• Changes apply next month</div>
        </Card>
      </div>
      <Card title="📋 Complete Product Reference Table">
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["#","Model","Type","Retail Price","Points","Commission","Units Activated","Revenue","Price Tier"].map(h=>(
                <th key={h} style={{padding:"10px 12px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{PRODUCTS.map((p,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${B.border}`,background:i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"11px 12px"}}><div style={{width:26,height:26,background:p.c+"18",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:p.c}}>{i+1}</div></td>
                <td style={{padding:"11px 12px",fontWeight:800,color:B.text}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:2,background:p.c,flexShrink:0}}/>{p.m}</div></td>
                <td style={{padding:"11px 12px",color:B.muted,fontSize:12}}>{p.type}</td>
                <td style={{padding:"11px 12px",fontWeight:700}}>BDT {p.price.toLocaleString()}</td>
                <td style={{padding:"11px 12px"}}><span style={{background:p.c+"18",color:p.c,fontWeight:900,fontSize:14,padding:"3px 12px",borderRadius:20,border:`1px solid ${p.c}33`}}>{p.pts}</span></td>
                <td style={{padding:"11px 12px",fontWeight:700,color:B.green}}>BDT {p.pts}</td>
                <td style={{padding:"11px 12px",color:B.text}}>{p.units.toLocaleString()}</td>
                <td style={{padding:"11px 12px",fontWeight:700,color:B.blue}}>BDT {(p.price*p.units/1000).toFixed(0)}K</td>
                <td style={{padding:"11px 12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{flex:1,background:B.border,borderRadius:4,height:6,minWidth:50}}>
                      <div style={{background:p.c,borderRadius:4,height:6,width:`${(p.price/maxP)*100}%`}}/>
                    </div>
                    <span style={{fontSize:10,color:B.muted,whiteSpace:"nowrap"}}>{Math.round(p.price/maxP*100)}%</span>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({onLogin}: {onLogin: (user: any) => void}) {
  const [mode,setMode]=useState("login");
  const [step,setStep]=useState(1);
  const [role,setRole]=useState("technician");
  const [form,setForm]=useState<Record<string, string>>({});
  const [err,setErr]=useState("");

  const set=(k: string)=>(e: React.ChangeEvent<HTMLInputElement>)=>setForm(f=>({...f,[k]:e.target.value}));

  const handleLogin=()=>{
    if(!form.email||!form.password){setErr("Please fill all fields.");return;}
    onLogin({role,name:role==="technician"?"Rahim Telecom":role==="ceo"?"CEO — Mr. Rahman":role==="manager"?"Area Manager — Dhaka":"Finance Manager"});
  };
  const handleSignup=()=>{
    if(step===1){
      if(!form.fullname||!form.phone||!form.email||!form.password){setErr("All fields required.");return;}
      setErr("");setStep(2);
    } else {
      if(!form.isp||!form.license||!form.district||!form.nid||!form.ref_owner||!form.ref_phone){setErr("All fields required, including ISP owner reference.");return;}
      setErr("");setMode("pending");
    }
  };

  if(mode==="pending") return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:B.card,borderRadius:20,padding:"40px 32px",maxWidth:460,width:"100%",textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,0.1)"}}>
        <div style={{fontSize:56,marginBottom:16}}>⏳</div>
        <div style={{fontSize:22,fontWeight:800,color:B.text,marginBottom:8}}>Application Submitted!</div>
        <div style={{color:B.muted,fontSize:14,lineHeight:1.7,marginBottom:24}}>Your registration is under review by the <strong>Rasa Regional Manager</strong>. You'll be notified within 24–48 hours after your ISP owner's reference is verified.</div>
        <Btn label="← Back to Login" onClick={()=>{setMode("login");setStep(1);setForm({});}} full color={B.blue}/>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${B.dark} 0%,${B.blueD} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:B.card,borderRadius:24,boxShadow:"0 20px 60px rgba(0,0,0,0.25)",maxWidth:480,width:"100%",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${B.red},${B.blue})`,padding:"28px 32px",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><RasaLogo h={36}/></div>
          <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:6}}>Powered by <strong>V·SOL</strong> products · ISP Technician Commission Programme</div>
        </div>

        <div style={{padding:"28px 32px"}}>
          {/* Tab */}
          <div style={{display:"flex",gap:0,marginBottom:24,background:B.bg,borderRadius:12,padding:4}}>
            {["login","signup"].map(m=>(
              <button key={m} onClick={()=>{setMode(m);setStep(1);setErr("");setForm({});}} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:mode===m?B.card:"transparent",color:mode===m?B.text:B.muted,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit",boxShadow:mode===m?"0 2px 8px rgba(0,0,0,0.1)":"none"}}>{m==="login"?"Sign In":"Register"}</button>
            ))}
          </div>

          {mode==="login"&&<>
            {/* Role selector */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,color:B.text,marginBottom:8}}>Login as:</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["technician","👨‍🔧 Technician"],["manager","🗂️ Area Manager"],["finance","💳 Finance"],["ceo","👑 CEO"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setRole(k)} style={{padding:"7px 14px",borderRadius:20,border:`2px solid ${role===k?B.red:B.border}`,background:role===k?B.red:"#fff",color:role===k?"#fff":B.muted,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
                ))}
              </div>
            </div>
            <Input label="Email or Phone" placeholder="Enter email or phone" icon="📧" value={form.email} onChange={set("email")}/>
            <Input label="Password" type="password" placeholder="Enter password" icon="🔒" value={form.password} onChange={set("password")}/>
            {err&&<div style={{color:B.red,fontSize:12,marginBottom:10}}>{err}</div>}
            <Btn label="Sign In →" onClick={handleLogin} full color={B.red}/>
            <div style={{textAlign:"center",marginTop:14,color:B.muted,fontSize:13}}>Forgot password? <span style={{color:B.blue,fontWeight:700,cursor:"pointer"}}>Reset via OTP</span></div>
          </>}

          {mode==="signup"&&<>
            {/* Step indicator */}
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              {[1,2].map(s=><div key={s} style={{flex:1,height:5,borderRadius:5,background:s<=step?B.red:B.border}}/>)}
            </div>
            <div style={{fontSize:13,fontWeight:700,color:B.muted,marginBottom:14}}>Step {step} of 2 — {step===1?"Personal Information":"ISP Details & Reference"}</div>

            {step===1&&<>
              <Input label="Full Name" placeholder="Your full name" icon="👤" value={form.fullname} onChange={set("fullname")} required/>
              <Input label="Phone Number" placeholder="+880 1X-XXXXXXXX" icon="📱" value={form.phone} onChange={set("phone")} required/>
              <Input label="Email Address" placeholder="you@email.com" icon="📧" value={form.email} onChange={set("email")} required/>
              <Input label="Password" type="password" placeholder="Minimum 8 characters" icon="🔒" value={form.password} onChange={set("password")} required/>
            </>}

            {step===2&&<>
              <Input label="ISP Company Name" placeholder="Your ISP's registered name" icon="🏢" value={form.isp} onChange={set("isp")} required/>
              <Input label="BTRC License Number" placeholder="BTRC-YYYY-XXXX" icon="📄" value={form.license} onChange={set("license")} required/>
              <Input label="Division / District" placeholder="Your main service area" icon="📍" value={form.district} onChange={set("district")} required/>
              <Input label="NID Number" placeholder="National ID number" icon="🪪" value={form.nid} onChange={set("nid")} required/>
              {/* ISP Reference */}
              <div style={{background:"#FFF5F5",border:`1.5px solid ${B.red}33`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
                <div style={{fontSize:13,fontWeight:800,color:B.red,marginBottom:4}}>🔗 ISP Owner Reference (Required)</div>
                <div style={{fontSize:12,color:B.muted,marginBottom:12,lineHeight:1.5}}>Your ISP owner must be registered with Rasa Technology. Applications without a valid reference will not be processed.</div>
                <Input label="ISP Owner Full Name" placeholder="Full name of your ISP owner" icon="👤" value={form.ref_owner} onChange={set("ref_owner")} required/>
                <Input label="ISP Owner Mobile Number" placeholder="+880 1X-XXXXXXXX" icon="📱" value={form.ref_phone} onChange={set("ref_phone")} required/>
              </div>
            </>}

            {err&&<div style={{color:B.red,fontSize:12,marginBottom:10}}>{err}</div>}
            <div style={{display:"flex",gap:10}}>
              {step===2&&<Btn label="← Back" onClick={()=>{setStep(1);setErr("");}} outline color={B.muted}/>}
              <Btn label={step===1?"Next: ISP Details →":"Submit Application ✓"} onClick={handleSignup} full color={B.red}/>
            </div>
            <div style={{textAlign:"center",marginTop:14,color:B.muted,fontSize:13}}>Already registered? <span style={{color:B.blue,fontWeight:700,cursor:"pointer"}} onClick={()=>{setMode("login");setErr("");}}>Sign In</span></div>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── TECHNICIAN PORTAL PAGES ──────────────────────────────────────────────────
function TechDashboard({onNav}: {onNav: (page: string) => void}) {
  const nextR=16400; const ptsNeeded=nextR-MY_PTS; const pct=Math.round(MY_PTS/29400*100);
  const recent=[{sn:"VS240512345",product:"VSOL V1600G1",pts:120,status:"pending",date:"Apr 19"},{sn:"VS240500123",product:"VSOL V1600G1",pts:120,status:"approved",date:"Apr 17"},{sn:"VS240498821",product:"VSOL V2802RGW",pts:80,status:"approved",date:"Apr 15"}];
  const stC={approved:B.green,pending:B.warn,rejected:B.red};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${B.red},${B.blue})`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{opacity:.8,fontSize:13}}>Welcome back,</div>
            <div style={{fontSize:24,fontWeight:900}}>Rahim Telecom 👋</div>
            <div style={{marginTop:6}}><span style={{background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>✓ Approved Technician</span></div>
          </div>
          <div style={{background:"rgba(255,215,0,0.15)",border:"1.5px solid rgba(255,215,0,0.4)",borderRadius:14,padding:"12px 18px",cursor:"pointer",textAlign:"center"}} onClick={()=>onNav("tech_lb")}>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>Your Rank</div>
            <div style={{color:"#FFD700",fontSize:28,fontWeight:900}}>#{MY_RANK}</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:11,marginTop:2}}>🎁 Samsung Tab S9</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="⭐" label="Total Points" value={MY_PTS.toLocaleString()} sub="1 pt = BDT 1" color={B.red}/>
        <KPI icon="⏳" label="Pending Pts" value="120" color={B.warn}/>
        <KPI icon="💰" label="This Month" value="BDT 220" color={B.green}/>
        <KPI icon="🏆" label="Rank" value={`#${MY_RANK}`} sub="of 100" color={B.blue} trend="Top 10%"/>
      </div>

      {/* Rank progress */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:14,fontWeight:800,color:B.text}}>🏆 Leaderboard Progress</div>
          <button onClick={()=>onNav("tech_lb")} style={{background:B.red+"15",border:`1px solid ${B.red}33`,color:B.red,borderRadius:10,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>View Full Board →</button>
        </div>
        <div style={{fontSize:12,color:B.muted,marginBottom:8}}>{ptsNeeded} pts more → <strong style={{color:B.red}}>Rank #4</strong> (Samsung Tab S9 → 55" Smart TV!)</div>
        <div style={{background:B.border,borderRadius:10,height:10}}>
          <div style={{background:`linear-gradient(90deg,${B.red},${B.blue})`,borderRadius:10,height:10,width:`${pct}%`}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
          <span style={{fontSize:11,color:B.muted}}>{MY_PTS.toLocaleString()} pts (Min for Rank #{MY_RANK})</span>
          <span style={{fontSize:11,color:B.muted}}>Top: 29,400 pts</span>
        </div>
        <div style={{marginTop:12,background:"#FFF5F5",borderRadius:10,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:16}}>🏖️</span>
          <span style={{fontSize:12,color:B.red,fontWeight:600}}>Top 50 win Cox's Bazar trip or exciting prizes!</span>
          <button onClick={()=>onNav("rewards")} style={{marginLeft:"auto",background:B.red,border:"none",color:"#fff",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>See Rewards</button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
        {[{label:"Scan & Submit Serial",icon:"📷",key:"scan",color:B.red,desc:"Register a new VSOL product"},{label:"My Submission History",icon:"📋",key:"submissions",color:B.blue,desc:"View all your submissions"},{label:"Technician Leaderboard",icon:"🏅",key:"tech_lb",color:"#7C3AFF",desc:"See your ranking"},{label:"ISP Leaderboard",icon:"🏭",key:"isp_lb",color:B.green,desc:"ISP team rankings"},{label:"My Earnings",icon:"💰",key:"commission",color:B.warn,desc:"Commission & claim"},{label:"Product Points",icon:"📦",key:"products",color:"#0891B2",desc:"Points per product"}].map(a=>(
          <div key={a.key} onClick={()=>onNav(a.key)} style={{background:B.card,borderRadius:16,padding:16,border:`1px solid ${B.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
            <div style={{width:44,height:44,background:a.color+"18",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{a.icon}</div>
            <div><div style={{fontSize:13,fontWeight:700,color:B.text}}>{a.label}</div><div style={{fontSize:11,color:B.muted}}>{a.desc}</div></div>
          </div>
        ))}
      </div>

      {/* Recent */}
      <Card title="📋 Recent Submissions">
        {recent.map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<2?`1px solid ${B.border}`:"none"}}>
            <div style={{width:40,height:40,background:B.red+"12",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📡</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:B.text}}>{r.product}</div>
              <div style={{fontSize:11,color:B.muted}}>SN: {r.sn} · {r.date}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:13,fontWeight:800,color:B.red}}>+{r.pts}pts</div>
              {pill(stC[r.status],r.status==="approved"?"✓ OK":"⏳ Pending",true)}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ScanSerial({onNav}: {onNav: (page: string) => void}) {
  const [step,setStep]=useState("scan");
  const [sn,setSn]=useState("VS240512345");
  if(step==="success") return (
    <div style={{maxWidth:560,margin:"0 auto"}}>
      <Card>
        <div style={{textAlign:"center",padding:"24px 0"}}>
          <div style={{fontSize:56,marginBottom:12}}>🎉</div>
          <div style={{fontSize:22,fontWeight:800,color:B.green,marginBottom:8}}>Serial Verified!</div>
          <div style={{color:B.muted,fontSize:14,lineHeight:1.7,marginBottom:20}}><strong>VSOL V1600G1</strong> matched in database.<br/>+120 pts pending manager approval.</div>
          {[["Serial Number",sn],["Product","VSOL V1600G1"],["Points Awarded","+120 ⭐ (Pending)"],["Submitted","Apr 21, 2026 — 14:32"],["Status","⏳ Awaiting Manager Review"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${B.border}`,textAlign:"left"}}>
              <span style={{fontSize:13,color:B.muted}}>{k}</span><span style={{fontSize:13,fontWeight:700,color:B.text}}>{v}</span>
            </div>
          ))}
          <div style={{marginTop:20,display:"flex",gap:10}}>
            <Btn label="Submit Another" onClick={()=>setStep("scan")} full outline color={B.red}/>
            <Btn label="🏠 Dashboard" onClick={()=>onNav("dashboard")} full color={B.red}/>
          </div>
        </div>
      </Card>
    </div>
  );
  if(step==="confirm") return (
    <div style={{maxWidth:560,margin:"0 auto"}}>
      <Card title="✅ Confirm & Submit">
        <div style={{background:"#1a1a2e",borderRadius:12,height:90,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,flexDirection:"column",gap:4}}>
          <span style={{fontSize:26}}>📷</span><span style={{color:"rgba(255,255,255,0.5)",fontSize:12}}>Photo captured ✓</span>
        </div>
        <Input label="Serial Number" value={sn} onChange={e=>setSn(e.target.value)}/>
        <Input label="Customer Name (optional)" placeholder="Customer's full name" icon="👤"/>
        <Input label="Customer Phone (optional)" placeholder="+880 1X-XXXXXXXX" icon="📱"/>
        <Input label="Installation Location (optional)" placeholder="Address where product was installed" icon="📍"/>
        <div style={{display:"flex",gap:10}}>
          <Btn label="← Back" onClick={()=>setStep("scan")} outline color={B.muted}/>
          <Btn label="Submit for Verification ✓" onClick={()=>setStep("success")} full color={B.red}/>
        </div>
      </Card>
    </div>
  );
  return (
    <div style={{maxWidth:560,margin:"0 auto",display:"flex",flexDirection:"column",gap:16}}>
      <Card title="📷 Scan Serial Number">
        <div style={{background:"#0A1128",borderRadius:14,height:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle,#1a2040,#050810)"}}/>
          <div style={{position:"relative",zIndex:1,textAlign:"center"}}>
            <div style={{fontSize:48}}>📷</div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:13,marginTop:6}}>Point camera at the VSOL serial number label</div>
          </div>
          <div style={{position:"absolute",zIndex:2,width:220,height:70,border:"2px solid rgba(0,87,255,0.8)",borderRadius:8}}>
            {[[{top:-3,left:-3,borderTop:"3px solid #CC0000",borderLeft:"3px solid #CC0000"}],[{top:-3,right:-3,borderTop:"3px solid #CC0000",borderRight:"3px solid #CC0000"}],[{bottom:-3,left:-3,borderBottom:"3px solid #CC0000",borderLeft:"3px solid #CC0000"}],[{bottom:-3,right:-3,borderBottom:"3px solid #CC0000",borderRight:"3px solid #CC0000"}]].map(([s],i)=>(
              <div key={i} style={{position:"absolute",width:16,height:16,...s}}/>
            ))}
          </div>
        </div>
        <Btn label="📷  Capture Photo" onClick={()=>setStep("confirm")} full color={B.red}/>
        <button onClick={()=>setStep("confirm")} style={{background:"none",border:"none",color:B.blue,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:12,padding:6,width:"100%"}}>✏️ Enter serial number manually instead</button>
      </Card>
      <Card>
        <div style={{fontSize:13,fontWeight:700,color:B.text,marginBottom:10}}>💡 Submission Rules</div>
        <div style={{fontSize:13,color:B.muted,lineHeight:1.8}}>• Serial number must match Rasa Technology's VSOL database<br/>• Each serial can only be submitted once<br/>• Photo proof of the serial label is required<br/>• Points awarded after Regional Manager approval</div>
      </Card>
    </div>
  );
}

function CommissionPage({onNav}: {onNav: (page: string) => void}) {
  const [bkash,setBkash]=useState("");
  const [claimed,setClaimed]=useState(false);
  const months=[{m:"April 2026",pts:340,amt:"BDT 340",paid:false},{m:"March 2026",pts:520,amt:"BDT 520",paid:true},{m:"February 2026",pts:280,amt:"BDT 280",paid:true},{m:"January 2026",pts:160,amt:"BDT 160",paid:true}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,maxWidth:700}}>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="💰" label="Total Earned" value="BDT 1,300" sub="All time" color={B.green}/>
        <KPI icon="✅" label="Paid Out" value="BDT 960" color={B.blue}/>
        <KPI icon="⏳" label="Pending" value="BDT 340" color={B.warn}/>
        <KPI icon="🏆" label="Current Prize" value="🎁 Tab S9" color={B.red}/>
      </div>

      {/* Claim via bKash */}
      <Card title="💸 Claim Reward via bKash" sub="Cash equivalent of your current rank prize">
        {claimed ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:40,marginBottom:10}}>✅</div>
            <div style={{fontSize:16,fontWeight:800,color:B.green}}>bKash Transfer Requested!</div>
            <div style={{color:B.muted,fontSize:13,marginTop:6}}>BDT 12,000 will be transferred to <strong>{bkash}</strong> within 7 working days after Finance Department approval.</div>
          </div>
        ) : (
          <>
            <div style={{background:"#FFF5F5",border:`1px solid ${B.red}22`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                <div><div style={{fontSize:12,color:B.muted}}>Your Prize (Rank #{MY_RANK})</div><div style={{fontSize:16,fontWeight:800,color:B.text}}>📱 Samsung Tab S9</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:12,color:B.muted}}>Cash Value</div><div style={{fontSize:20,fontWeight:900,color:B.green}}>BDT 12,000</div></div>
              </div>
            </div>
            <div style={{background:"#E2136E15",border:"1.5px solid #E2136E33",borderRadius:12,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,background:"#E2136E",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16,flexShrink:0}}>b</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:"#E2136E"}}>bKash Transfer</div>
                <div style={{fontSize:11,color:B.muted}}>Withdraw cash from any bKash agent near you</div>
              </div>
            </div>
            <Input label="Your bKash Mobile Number" placeholder="+880 1X-XXXXXXXX" icon="📱" value={bkash} onChange={e=>setBkash(e.target.value)} required/>
            <Btn label={`💸 Request BDT 12,000 to bKash`} onClick={()=>bkash?setClaimed(true):null} full color="#E2136E"/>
            <div style={{textAlign:"center",marginTop:10,color:B.muted,fontSize:11}}>Amount credited within 7 working days · Requires Finance Department approval</div>
          </>
        )}
      </Card>

      <Card title="📅 Monthly Commission Breakdown">
        {months.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<3?`1px solid ${B.border}`:"none"}}>
            <div style={{width:38,height:38,background:m.paid?B.green+"15":B.warn+"15",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{m.paid?"✅":"⏳"}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:B.text}}>{m.m}</div><div style={{fontSize:11,color:B.muted}}>{m.pts} points earned</div></div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:14,fontWeight:800,color:m.paid?B.green:B.warn}}>{m.amt}</div>
              {pill(m.paid?B.green:B.warn,m.paid?"Paid ✓":"Pending",true)}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── MANAGEMENT PORTAL PAGES ──────────────────────────────────────────────────
function CEODashboard() {
  const totalRev=MONTHLY.reduce((s,d)=>s+d.commission,0);
  const totalActs=MONTHLY.reduce((s,d)=>s+d.activations,0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,${B.dark},${B.blue})`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:10,letterSpacing:2,opacity:.6,fontWeight:600,marginBottom:4}}>RASA TECHNOLOGY · VSOL CONNECT PROGRAMME</div>
        <div style={{fontSize:24,fontWeight:900,marginBottom:4}}>👑 CEO Executive Dashboard · 2026</div>
        <div style={{opacity:.8,fontSize:13}}>All Regions · All ISPs · Live Data</div>
        <div style={{display:"flex",gap:28,marginTop:16,flexWrap:"wrap"}}>
          {[[`BDT ${Math.round(totalRev/1000)}K`,"Total Commission"],[totalActs.toLocaleString(),"Total Activations"],["100","Active Technicians"],["8","ISPs Enrolled"],["8","Districts"]].map(([v,l])=>(
            <div key={l}><div style={{fontSize:20,fontWeight:900,color:"#FFD700"}}>{v}</div><div style={{fontSize:11,opacity:.7}}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="💰" label="Annual Commission" value={`BDT ${(totalRev/1000).toFixed(0)}K`} sub="1 pt = BDT 1" color={B.red} trend="+18% vs last year"/>
        <KPI icon="📦" label="Total Activations" value={totalActs.toLocaleString()} color={B.blue}/>
        <KPI icon="👥" label="Technicians" value="100" color="#7C3AFF"/>
        <KPI icon="🎁" label="Pending Claims" value={CLAIMS.filter(r=>r.status==="pending").length} color={B.warn}/>
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <Card title="📈 Monthly Commission & Activations" style={{flex:2,minWidth:280}}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY} margin={{top:5,right:5,bottom:5,left:0}}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={B.red} stopOpacity={0.2}/><stop offset="95%" stopColor={B.red} stopOpacity={0}/></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={B.blue} stopOpacity={0.2}/><stop offset="95%" stopColor={B.blue} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:B.muted}}/>
              <YAxis tick={{fontSize:10,fill:B.muted}} tickFormatter={v=>v>=1000?`${v/1000}k`:v}/>
              <Tooltip formatter={(v,n)=>[n==="commission"?`BDT ${v.toLocaleString()}`:v,n==="commission"?"Commission":"Activations"]}/>
              <Area type="monotone" dataKey="commission" stroke={B.red} fill="url(#g1)" strokeWidth={2.5} dot={false}/>
              <Area type="monotone" dataKey="activations" stroke={B.blue} fill="url(#g2)" strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="🗺️ Points by District" style={{flex:1,minWidth:220}}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={AREAS.map(a=>({n:a.d.slice(0,5),pts:Math.round(a.pts/1000)}))} margin={{top:5,right:0,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
              <XAxis dataKey="n" tick={{fontSize:10,fill:B.muted}}/>
              <YAxis tick={{fontSize:10,fill:B.muted}} tickFormatter={v=>`${v}k`}/>
              <Tooltip formatter={v=>[`${v}K pts`,"Points"]}/>
              <Bar dataKey="pts" radius={[5,5,0,0]}>{AREAS.map((a,i)=><Cell key={i} fill={a.c}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <Card title="📦 Product Mix" style={{flex:1,minWidth:200}}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={PRODUCTS} dataKey="units" nameKey="m" cx="50%" cy="50%" outerRadius={70} innerRadius={35} label={({percent})=>`${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
              {PRODUCTS.map((p,i)=><Cell key={i} fill={p.c}/>)}
            </Pie><Tooltip formatter={(v,n)=>[`${v} units`,n]}/></PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="💳 Claim Methods" style={{flex:1,minWidth:200}}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={CLAIM_METHODS} dataKey="v" nameKey="n" cx="50%" cy="50%" outerRadius={70} innerRadius={35} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
              {CLAIM_METHODS.map((d,i)=><Cell key={i} fill={d.c}/>)}
            </Pie><Tooltip formatter={(v)=>[`${v}%`,"Share"]}/></PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="👥 Technician Growth" style={{flex:1,minWidth:200}}>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={MONTHLY} margin={{top:5,right:5,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:B.muted}}/>
              <YAxis tick={{fontSize:10,fill:B.muted}}/>
              <Tooltip/>
              <Line type="monotone" dataKey="techs" stroke={B.red} strokeWidth={2.5} dot={{r:3}} name="Technicians"/>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="🏆 Top 5 ISPs">
        {ISP_LB.slice(0,5).map((l,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<4?`1px solid ${B.border}`:"none"}}>
            <div style={{width:32,height:32,background:["#FFD700","#C0C0C0","#CD7F32",B.blue,B.green][i]+"22",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:["#FFD700","#C0C0C0","#CD7F32",B.blue,B.green][i],flexShrink:0}}>{["🥇","🥈","🥉",`#4`,`#5`][i]}</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{l.isp}</div><div style={{fontSize:11,color:B.muted}}>{l.d} · {l.t} technicians</div></div>
            <div style={{fontWeight:800,fontSize:13,color:B.red}}>{(l.pts/1000).toFixed(1)}K pts</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AreaManagerPage() {
  const [items,setItems]=useState(SIGNUPS);
  const [tab,setTab]=useState("pending");
  const update=(id,s)=>setItems(p=>p.map(r=>r.id===id?{...r,status:s}:r));
  const shown=tab==="all"?items:items.filter(r=>r.status===tab);
  const pending=items.filter(r=>r.status==="pending").length;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,${B.blue},${B.blueD})`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>🗂️ Area Manager — Signup Approval</div>
        <div style={{opacity:.8,fontSize:13}}>Review technician registration applications including ISP owner reference verification</div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="⏳" label="Pending Review" value={pending} color={B.warn}/>
        <KPI icon="✅" label="Approved" value={items.filter(r=>r.status==="approved").length} color={B.green}/>
        <KPI icon="✗" label="Rejected" value={items.filter(r=>r.status==="rejected").length} color={B.red}/>
        <KPI icon="📋" label="Total" value={items.length} color={B.blue}/>
      </div>
      <Card title="📋 Technician Signup Requests">
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          {["pending","approved","rejected","all"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${tab===t?B.red:B.border}`,background:tab===t?B.red:"#fff",color:tab===t?"#fff":B.muted,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t==="all"?"All":`${t.charAt(0).toUpperCase()+t.slice(1)}`}{t==="pending"&&pending>0?` (${pending})`:""}</button>
          ))}
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["#","Name","Phone","District","ISP","License","ISP Owner Ref","Owner Phone","Submitted","Status","Actions"].map(h=>(
                <th key={h} style={{padding:"9px 10px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{shown.map((r,i)=>(
              <tr key={r.id} style={{borderBottom:`1px solid ${B.border}`,background:i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"10px 10px",color:B.muted,fontWeight:700}}>{r.id}</td>
                <td style={{padding:"10px 10px",fontWeight:700,color:B.text}}>{r.name}</td>
                <td style={{padding:"10px 10px",color:B.muted}}>{r.phone}</td>
                <td style={{padding:"10px 10px"}}>{pill(B.blue,r.d,true)}</td>
                <td style={{padding:"10px 10px",fontSize:12}}>{r.isp}</td>
                <td style={{padding:"10px 10px",color:B.muted,fontSize:11}}>{r.license}</td>
                <td style={{padding:"10px 10px",fontWeight:600,color:B.text,fontSize:12}}>{r.ref_owner}</td>
                <td style={{padding:"10px 10px",color:B.muted,fontSize:12}}>{r.ref_phone}</td>
                <td style={{padding:"10px 10px",color:B.muted,fontSize:11}}>{r.date}</td>
                <td style={{padding:"10px 10px"}}>{pill(r.status==="approved"?B.green:r.status==="rejected"?B.red:B.warn,r.status==="approved"?"✓ Approved":r.status==="rejected"?"✗ Rejected":"⏳ Pending",true)}</td>
                <td style={{padding:"10px 10px"}}><ApproveRejectBtns row={r} onUpdate={update}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FinancePage() {
  const [items,setItems]=useState(CLAIMS);
  const [tab,setTab]=useState("pending");
  const update=(id,s)=>setItems(p=>p.map(r=>r.id===id?{...r,status:s}:r));
  const shown=tab==="all"?items:items.filter(r=>r.status===tab);
  const totalPending=items.filter(r=>r.status==="pending").reduce((s,r)=>s+r.cash,0);
  const totalApproved=items.filter(r=>r.status==="approved").reduce((s,r)=>s+r.cash,0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,${B.green},#065F46)`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>💳 Finance Department — Reward & bKash Claims</div>
        <div style={{opacity:.8,fontSize:13}}>Review and approve technician reward claims and bKash cash-out transfers</div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <KPI icon="⏳" label="Pending Payout" value={`BDT ${(totalPending/1000).toFixed(0)}K`} sub={`${items.filter(r=>r.status==="pending").length} claims`} color={B.warn}/>
        <KPI icon="✅" label="Approved Payout" value={`BDT ${(totalApproved/1000).toFixed(0)}K`} color={B.green}/>
        <KPI icon="📱" label="bKash Transfers" value={items.filter(r=>r.bkash&&r.bkash!=="—").length} color="#E2136E"/>
        <KPI icon="🎁" label="Physical Prizes" value={items.filter(r=>!r.bkash||r.bkash==="—").length} color={B.blue}/>
      </div>
      <Card>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={[{cat:"Rank 1-3",comm:24100,prize:18000},{cat:"Rank 4-5",comm:16200,prize:12000},{cat:"Rank 6-10",comm:10700,prize:8000}]} margin={{top:5,right:5,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
            <XAxis dataKey="cat" tick={{fontSize:11,fill:B.muted}}/>
            <YAxis tick={{fontSize:10,fill:B.muted}} tickFormatter={v=>`${v/1000}k`}/>
            <Tooltip formatter={(v,n)=>[`BDT ${v.toLocaleString()}`,n==="comm"?"Commission Earned":"Prize Cost"]}/>
            <Legend iconSize={10} wrapperStyle={{fontSize:11}}/>
            <Bar dataKey="comm" name="comm" fill={B.blue} radius={[4,4,0,0]}/>
            <Bar dataKey="prize" name="prize" fill={B.red} radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="🎁 Reward & bKash Claim Requests">
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          {["pending","approved","all"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${tab===t?B.green:B.border}`,background:tab===t?B.green:"#fff",color:tab===t?"#fff":B.muted,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t==="all"?"All Claims":`${t.charAt(0).toUpperCase()+t.slice(1)}`}{t==="pending"&&items.filter(r=>r.status==="pending").length>0?` (${items.filter(r=>r.status==="pending").length})`:""}</button>
          ))}
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["Rank","Technician","Prize","Cash Value","bKash Number","Submitted","Status","Action"].map(h=>(
                <th key={h} style={{padding:"9px 10px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{shown.map((r,i)=>(
              <tr key={r.id} style={{borderBottom:`1px solid ${B.border}`,background:i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"10px 10px",fontWeight:900,color:B.red}}>#{r.r}</td>
                <td style={{padding:"10px 10px",fontWeight:700}}>{r.name}</td>
                <td style={{padding:"10px 10px",fontSize:12,color:B.text}}>{r.prize}</td>
                <td style={{padding:"10px 10px",fontWeight:800,color:B.green}}>BDT {r.cash.toLocaleString()}</td>
                <td style={{padding:"10px 10px"}}><span style={{background:"#E2136E15",color:"#E2136E",fontWeight:700,fontSize:12,padding:"3px 10px",borderRadius:8}}>{r.bkash}</span></td>
                <td style={{padding:"10px 10px",color:B.muted,fontSize:12}}>{r.date}</td>
                <td style={{padding:"10px 10px"}}>{pill(r.status==="approved"?B.green:B.warn,r.status==="approved"?"✓ Approved":"⏳ Pending",true)}</td>
                <td style={{padding:"10px 10px"}}><ApproveRejectBtns row={r} onUpdate={update}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ActivationReport() {
  const productBar=PRODUCTS.slice(0,6).map(p=>({n:p.m.replace("VSOL ",""),units:p.units,pts:p.pts*p.units}));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,#0891B2,#0C4A6E)`,borderRadius:20,padding:"24px 28px",color:"#fff"}}>
        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>📊 Area & ISP Activation Report</div>
        <div style={{opacity:.8,fontSize:13}}>Product activations by area, ISP, and model</div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {AREAS.slice(0,4).map(a=><KPI key={a.d} icon="📍" label={a.d} value={a.acts.toLocaleString()} sub={`${a.t} techs · ${(a.pts/1000).toFixed(0)}K pts`} color={a.c}/>)}
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <Card title="📈 Activations by District" style={{flex:1,minWidth:260}}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={AREAS.map(a=>({n:a.d.slice(0,5),acts:a.acts}))} margin={{top:5,right:5,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
              <XAxis dataKey="n" tick={{fontSize:10,fill:B.muted}}/>
              <YAxis tick={{fontSize:10,fill:B.muted}}/>
              <Tooltip/>
              <Bar dataKey="acts" name="Activations" radius={[5,5,0,0]}>{AREAS.map((a,i)=><Cell key={i} fill={a.c}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="🥧 District Share" style={{flex:1,minWidth:200}}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={AREAS} dataKey="pts" nameKey="d" cx="50%" cy="50%" outerRadius={70} innerRadius={35} label={({name,percent})=>`${name.slice(0,4)} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
              {AREAS.map((a,i)=><Cell key={i} fill={a.c}/>)}
            </Pie><Tooltip formatter={(v)=>[v.toLocaleString()+" pts","Points"]}/></PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="📦 Top Products by Units & Revenue">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={productBar} margin={{top:5,right:5,bottom:20,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={B.border}/>
            <XAxis dataKey="n" tick={{fontSize:9,fill:B.muted}} angle={-20} textAnchor="end"/>
            <YAxis tick={{fontSize:10,fill:B.muted}}/>
            <Tooltip/>
            <Legend iconSize={10} wrapperStyle={{fontSize:11}}/>
            <Bar dataKey="units" name="Units" radius={[4,4,0,0]}>{productBar.map((_,i)=><Cell key={i} fill={PRODUCTS[i].c}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="🏭 ISP Activation Summary">
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{borderBottom:`2px solid ${B.border}`}}>
              {["ISP Name","HQ","Technicians","Total Pts","Rank"].map(h=>(
                <th key={h} style={{padding:"9px 12px",textAlign:"left",color:B.muted,fontWeight:700,fontSize:11}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{ISP_LB.map((l,i)=>(
              <tr key={i} style={{borderBottom:`1px solid ${B.border}`,background:l.r<=5?"#F0FFF8":i%2===0?"#fff":"#FAFBFF"}}>
                <td style={{padding:"10px 12px",fontWeight:700}}>{l.isp}</td>
                <td style={{padding:"10px 12px"}}>{pill(B.blue,l.d,true)}</td>
                <td style={{padding:"10px 12px",color:B.muted}}>{l.t}</td>
                <td style={{padding:"10px 12px",fontWeight:800,color:B.red}}>{l.pts.toLocaleString()}</td>
                <td style={{padding:"10px 12px"}}>{pill(l.r<=5?B.green:B.muted,`#${l.r}`,true)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── APP SHELL ────────────────────────────────────────────────────────────────
const TECH_NAV=[
  {key:"dashboard",icon:"🏠",label:"Dashboard"},{key:"scan",icon:"📷",label:"Scan Serial"},
  {key:"submissions",icon:"📋",label:"My History"},{key:"commission",icon:"💰",label:"Earnings & Claim"},
  {key:"tech_lb",icon:"🏅",label:"Technician Board"},{key:"isp_lb",icon:"🏭",label:"ISP Board"},
  {key:"products",icon:"📦",label:"Product Points"},{key:"profile",icon:"👤",label:"My Profile"},
];
const MGMT_NAV=[
  {key:"ceo",icon:"👑",label:"CEO Dashboard",group:"Executive"},
  {key:"manager",icon:"🗂️",label:"Area Manager",group:"Operations"},
  {key:"finance",icon:"💳",label:"Finance Dept",group:"Operations"},
  {key:"activation",icon:"📊",label:"Activation Report",group:"Reports"},
  {key:"tech_lb",icon:"🏅",label:"Technician Board",group:"Leaderboards"},
  {key:"isp_lb",icon:"🏭",label:"ISP Board",group:"Leaderboards"},
  {key:"products",icon:"📦",label:"Product Reference",group:"Reference"},
];

function Portal({user,onLogout}) {
  const isTech=user.role==="technician";
  const nav=isTech?TECH_NAV:MGMT_NAV;
  const [page,setPage]=useState(isTech?"dashboard":"ceo");
  const [sideOpen,setSideOpen]=useState(true);

  const renderPage=()=>{
    if(isTech){
      switch(page){
        case "dashboard": return <TechDashboard onNav={setPage}/>;
        case "scan":      return <ScanSerial onNav={setPage}/>;
        case "commission":return <CommissionPage onNav={setPage}/>;
        case "tech_lb":   return <TechLeaderboard/>;
        case "isp_lb":    return <ISPLeaderboard/>;
        case "products":  return <ProductReference/>;
        case "profile":   return <div><KPI icon="👨‍🔧" label="Technician" value={user.name} color={B.red}/></div>;
        case "submissions":return <Card title="📋 Submission History"><div style={{color:B.muted,fontSize:13,textAlign:"center",padding:"30px 0"}}>All 7 submissions shown here with filter tabs</div></Card>;
        default:          return <TechDashboard onNav={setPage}/>;
      }
    } else {
      switch(page){
        case "ceo":       return <CEODashboard/>;
        case "manager":   return <AreaManagerPage/>;
        case "finance":   return <FinancePage/>;
        case "activation":return <ActivationReport/>;
        case "tech_lb":   return <TechLeaderboard/>;
        case "isp_lb":    return <ISPLeaderboard/>;
        case "products":  return <ProductReference/>;
        default:          return <CEODashboard/>;
      }
    }
  };

  const curLabel=nav.find(n=>n.key===page)?.label||"Dashboard";
  const pendingSignups=SIGNUPS.filter(r=>r.status==="pending").length;
  const pendingClaims=CLAIMS.filter(r=>r.status==="pending").length;

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',sans-serif",background:B.bg,overflow:"hidden"}}>
      {/* SIDEBAR */}
      <div style={{width:sideOpen?230:58,background:B.dark,display:"flex",flexDirection:"column",flexShrink:0,transition:"width 0.2s",overflow:"hidden"}}>
        <div style={{padding:sideOpen?"18px 16px 14px":"14px 8px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {sideOpen
              ? <RasaLogo h={28}/>
              : <div style={{width:34,height:34,background:`linear-gradient(135deg,${B.red},${B.blue})`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📡</div>
            }
          </div>
          {sideOpen&&<div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}><VSOLBadge h={18}/><span style={{color:"rgba(255,255,255,0.4)",fontSize:10}}>Powered by</span></div>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
          {!isTech&&[...new Set(MGMT_NAV.map(n=>n.group))].map(g=>(
            <div key={g}>
              {sideOpen&&<div style={{color:"rgba(255,255,255,0.28)",fontSize:10,fontWeight:700,letterSpacing:1,padding:"12px 16px 4px",textTransform:"uppercase"}}>{g}</div>}
              {MGMT_NAV.filter(n=>n.group===g).map(item=>(
                <NavItem key={item.key} item={item} active={page===item.key} onClick={()=>setPage(item.key)} sideOpen={sideOpen} badge={item.key==="manager"?pendingSignups:item.key==="finance"?pendingClaims:0}/>
              ))}
            </div>
          ))}
          {isTech&&nav.map(item=>(
            <NavItem key={item.key} item={item} active={page===item.key} onClick={()=>setPage(item.key)} sideOpen={sideOpen}/>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"10px 8px"}}>
          {sideOpen&&<div style={{background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
            <div style={{color:"rgba(255,255,255,0.5)",fontSize:10}}>Logged in as</div>
            <div style={{color:"#fff",fontSize:12,fontWeight:700,marginTop:2}}>{user.name}</div>
          </div>}
          <button onClick={()=>setSideOpen(!sideOpen)} style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"none",borderRadius:8,padding:"8px",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{sideOpen?"◀":"▶"}</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Top bar */}
        <div style={{background:B.card,borderBottom:`1px solid ${B.border}`,padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:16,fontWeight:800,color:B.text}}>{curLabel}</span>
            <span style={{color:B.muted,fontSize:12}}>· VSOL Connect Programme</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {!isTech&&pendingSignups>0&&<span style={{background:B.warn+"18",border:`1px solid ${B.warn}44`,color:B.warn,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={()=>setPage("manager")}>⚠️ {pendingSignups} Signups</span>}
            {!isTech&&pendingClaims>0&&<span style={{background:B.red+"15",border:`1px solid ${B.red}33`,color:B.red,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={()=>setPage("finance")}>🎁 {pendingClaims} Claims</span>}
            <button onClick={onLogout} style={{background:B.red+"12",border:`1px solid ${B.red}33`,color:B.red,borderRadius:10,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Sign Out</button>
          </div>
        </div>
        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"24px"}}>{renderPage()}</div>
      </div>
    </div>
  );
}

function NavItem({item,active,onClick,sideOpen,badge=0}) {
  return (
    <button onClick={onClick} style={{width:"100%",background:active?"rgba(204,0,0,0.2)":"none",border:"none",borderLeft:active?`3px solid ${B.red}`:"3px solid transparent",display:"flex",alignItems:"center",gap:10,padding:sideOpen?"9px 16px":"9px 10px",cursor:"pointer",color:active?"#fff":"rgba(255,255,255,0.5)",fontFamily:"inherit",fontSize:13,fontWeight:active?700:500,position:"relative"}}>
      <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
      {sideOpen&&<span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,textAlign:"left"}}>{item.label}</span>}
      {badge>0&&sideOpen&&<span style={{background:B.red,color:"#fff",borderRadius:10,fontSize:10,fontWeight:700,padding:"2px 7px",flexShrink:0}}>{badge}</span>}
      {badge>0&&!sideOpen&&<span style={{position:"absolute",top:4,right:4,background:B.red,color:"#fff",borderRadius:10,fontSize:9,fontWeight:700,padding:"1px 5px"}}>{badge}</span>}
    </button>
  );
}

// ── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{fontFamily:"'DM Sans',sans-serif"}}>
        {!user
          ? <AuthPage onLogin={setUser}/>
          : <Portal user={user} onLogout={()=>setUser(null)}/>
        }
      </div>
    </>
  );
}
