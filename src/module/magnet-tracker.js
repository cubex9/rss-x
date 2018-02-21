const Torro = require('bittorrent-dht')
const toropa = require('parse-torrent')

/**
 * Get complete informations about torrent.
 * @param conf configuration of torrent client
 */
class MagnetTracker {
    constructor (conf) {
        this.conf = conf
        this.dth = null
    }

    /**
     * Start tracker, but get only infomation about torrent (l/s), files and size.
     * @param {*} magnet magnet link to torrent
     * @raram callback is (err,result) => {} method, will be call after infomations is complete
     */
    infoof (magnet, callback) {
        const o = toropa('magnet:?xt=urn:btih:25F0F0D20D13A1DDE1362D3DE1939428F2406F0E&dn=Den+of+Thieves+2018+NEW+720p+HD-TS+X264-CPG')
        console.log('magnetor:', o.infoHash)

        // const torrent = new Torro({
        //     infoHash: o.infoHash, // hex string or Buffer
        //     peerId: Buffer.from('984984983498534085498534432432423'),
        //     announce: [], // list of tracker server urls
        //     port: 6881 // torrent client port, (in browser, optional)
        // })

        // torrent.on('error', (err) => console.log(err.message))
        // torrent.on('warning', (err) => console.log(err.message))

        // torrent.start()

        // torrent.on('update', (data) => {
        //     console.log('TorroDatazz:', data)
        // })

        // torrent.once('peer', (addr) => {
        //     console.log('found a peer: ', addr)
        // })

        // torrent.update()

        this.dht = new Torro()

        this.dht.listen(20000, () => console.log('now listening'))

        // this.dht.on('peer', (peer, infoHash, from) => {
        //     console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
        // })

        // this.dht.announce(o.infoHash, 6881, (dd) => {
        //     console.log('from annonce: ', dd)
        // })

        // this.dht.on('announce', function (peer, infoHash) {
        //     console.log('founr annoce peer %s : %s ', peer.host, infoHash)
        // })

        // find peers for the given torrent info hash
        this.dht.lookup(o.infoHashBuffer, (err, nodes) => {
            if (err) {
                console.log('TorroError: ', err)
            } else {
                console.log('Nodes: ', this.dht.toJSON().nodes)
                this.dht.destroy()
            }
        })
    }
}

module.exports = MagnetTracker
