
RssChannel = new function RssChannel(link,name,nick) {

    /**
     * id of channel, it's application own property
     */
    this.id;

    /**
     * uri for dowload new items
     */
    this.rssUri;

    /**
     * html page of channel
     */
    this.web;

    /**
     * last update, it is mean: when we read last time
     */
    this.update;

    /**
     * channel name
     */
    this.name;


}