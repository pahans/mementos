/**
 * Split a given array in to chunks of arrays.
 * @param {Array[String]} arr Array to split in to chunks.
 * @param {int} chunkSize size of a array chunnk
 */
export function chunk(arr, chunkSize) {
  if (chunkSize <= 0) throw new Error("Invalid chunk size");
  var chunks = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}