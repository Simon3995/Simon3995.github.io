function byte_format(bits) {
    let bytes = bits/8;
    if (bits < 1000) return `${bits} b`;
    let order = Math.min(10, Math.floor(logab(1000, bytes)));
    let prefix = "KMGTPEZYRQ"[order-1];
    if (!prefix) prefix = "";
    return `${(bytes / (1e3 ** order)).toFixed(order>0?2:0)} ${prefix}B`;
}

function logab(a, b) {
    return Math.log(b) / Math.log(a);
}