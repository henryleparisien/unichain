crypto = require('crypto');

var Block = function(index, timestamp, data, previous_hash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previous_hash = previous_hash;
    this.hash = this.hash_block();
}

Block.prototype = {
    hash_block: function(e) {
        const secret = 'abcdefg';
        sha = crypto.createHmac('sha256', secret)
            .update(this.index.toString() + this.timestamp.toString() + this.data.toString() + this.previous_hash.toString())
            .digest('hex');
        return sha;
    }
}

var create_genesis_block = function() {
    return new Block(0, Date.now(), "Genesis Block", "0");
}

var next_block = function(last_block) {
    this_index = last_block.index + 1;
    this_timestamp = Date.now();
    this_data = "Hey! I'm block " + this_index.toString();
    this_hash = last_block.hash;
    return new Block(this_index, this_timestamp, this_data, this_hash);
}

blockchain = [create_genesis_block()];
previous_block = blockchain[0];

num_of_blocks_to_add = 20;

for (var i = 0; i < num_of_blocks_to_add; i++) {
    block_to_add = next_block(previous_block);
    blockchain.push(block_to_add);
    previous_block = block_to_add;
    console.log("Block #%d has been added to the blockchain!", block_to_add.index);
    console.log("Hash: %s\n", block_to_add.hash.toString());
}
