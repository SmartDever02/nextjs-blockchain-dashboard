import SearchForm from './SearchForm'

export default function Banner() {
  return (
    <div className="bg-[url(https://etherscan.io/images/svg/waves-light.svg)] w-full pt-14 pb-20 bg-[#101010] border-y border-y-primary-border">
      <div className="container mx-auto">
        <h1 className="text-xl text-white font-normal mb-3">
          The Ethereum Blockchain Explorer
        </h1>

        <SearchForm />
      </div>
    </div>
  )
}
