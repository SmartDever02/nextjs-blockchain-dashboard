import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Banner() {
  return (
    <div className="bg-[url(https://etherscan.io/images/svg/waves-light.svg)] w-full pt-14 pb-20 bg-[#101010] border-y border-y-primary-border">
      <div className='container mx-auto'>
        <h1 className='text-xl text-white font-normal mb-3'>The Ethereum Blockchain Explorer</h1>

        <form>
          <div className='h-12 max-w-[800px] w-full border border-primary-border rounded-lg bg-dark-bg flex gap-x-3 p-[6px]'>
            <input placeholder='Search by Address / Txn Hash / Block / Token / Domain Name' className='w-full bg-transparent rounded-md focus:outline-primary-border outline-none transition-all duration-200 px-3 text-sm' />
            <button className='bg-primary hover:bg-blue-400 transition-all duration-200 rounded-md w-9 h-9 aspect-square flex items-center justify-center'>
              <MagnifyingGlassIcon className='w-5 h-5'/>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
