/**
 * 
 * 如何判断一个对象是 stream
 * 
 * 每一个 stream 都有 pipe 函数，可以用来判断一个对象是否 stream
 * 
 * 参考 https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzA3MzU0MjIzMA==&action=getalbum&album_id=1419853337117425665&scene=173&from_msgid=2247483996&from_itemidx=1&count=3#wechat_redirect
 *
 * is-stream包有实现
 */
const isStream = stream =>
    stream !== null &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function';


isStream.writable = stream =>
    isStream(stream) &&
    stream.writable !== false &&
    typeof stream._write === 'function' &&
    typeof stream._writableState === 'object';

isStream.readable = stream =>
    isStream(stream) &&
    stream.readable !== false &&
    typeof stream._read === 'function' &&
    typeof stream._readableState === 'object';

isStream.duplex = stream =>
    isStream.writable(stream) &&
    isStream.readable(stream);

isStream.transform = stream =>
    isStream.duplex(stream) &&
    typeof stream._transform === 'function' &&
    typeof stream._transformState === 'object';