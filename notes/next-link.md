{/* use passHref when Link has a component/htmltag other than immediate text or <a> tag */}
<Link href="/" passHref>
    <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
        Home
    </a>
</Link>

vs

<Link href="/home">
    Home
</Link>