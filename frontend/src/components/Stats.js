export default function Stats({ user }) {

  const { stats } = user;

  return (<>
    <div className="flex flex-col gap-6 m-6 place-items-center bg-gray-700 rounded-lg">
      <p className='text-xl text-center'>
        Stats
      </p>
      <div className='flex flex-row gap-4'>
        <p className='text-slate-300'>Total Sales:</p>
        <p className='text-slate-200 text-bold'>${stats.totalSales}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <p className='text-slate-300'>MTD:</p>
        <p className='text-slate-200 text-bold'>${stats.monthToDate}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <p className='text-slate-300'>Most Recent:</p>
        <p className='text-slate-200 text-bold'>{Date(stats.lastSale.seconds * 1000)}</p>
      </div>
      <div className='flex flex-row gap-4'>
        <p className='text-slate-300'>Top Seller:</p>
        <p className='text-slate-200 text-bold'>{stats.topSeller}</p>
      </div>
    </div>
  </>)
}
