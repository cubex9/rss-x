RssSize = function RssSize(summary) {

    this.measure = 'GB';

    this.size = 0;

    var arr = / Size: ([\d\.]+) (MB|GB) /gi.exec(summary);

    if (arr != null) {

        this.size = arr[1];

        this.measure = arr[2];

        if (this.measure == 'MB') {
            this.size /= 1024;
        }
    }

}