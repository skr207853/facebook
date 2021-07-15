const express = require("express");
const {ObjectId} = require("mongodb");
const router = new express.Router();
const User = require("../models/user");

router.post("/addpost/:id", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.id);
        const postinjson=req.body;
        console.log(postinjson);
        await userFound.posts.push(postinjson);
        await userFound.save();
        if (userFound) {
            res.send(userFound);
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.send("Error " + err);
    }
});


router.post("/addfriend/:ids/:idf", async (req, res) => {
    try {
        const userFound = await User.findById(req.params.ids);
        const userFound2 = await User.findById(req.params.idf);
        if (userFound && userFound2) {
            if (await userFound.friends.includes(req.params.idf)) {
                res.send("He is already your friend.");
            } else {
                await userFound.friends.push(new ObjectId(req.params.idf));
                await userFound.save();
                await userFound2.friends.push(new ObjectId(req.params.ids));
                await userFound2.save();
                res.send("say.. hi to your friend");
            }
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.send("Error " + err);
    }
});


class Heap {
    constructor(arr) {
        this.hp = arr;
        this.n = arr.length;
    }

    compare(x, y) {
        return x.getTime() < y.getTime();
    }

    swap(x, y) {
        const tmp = this.hp[x];
        this.hp[x] = this.hp[y];
        this.hp[y] = tmp;
    }

    heapify(i, N = this.n) {
        let newi, l, r;
        while (1) {
            newi = i;
            l = i << 1 | 1;
            r = l + 1;
            if (l < N && this.compare(this.hp[newi], this.hp[l])) newi = l;
            if (r < N && this.compare(this.hp[newi], this.hp[r])) newi = r;
            if (newi == i) break;
            this.swap(i, newi);
            i = newi;
        }
    }

    build() {
        for (let i = (this.n >> 1) - 1; i >= 0; i--) {
            this.heapify(i);
        }
    }

    heapsort() {
        // this.build();
        for (let i = this.n - 1; i >= 0; --i) {
            this.swap(0, i);
            this.heapify(0, i);
        }
    }

    push(vl) {
        this.hp.length = this.n + 1;
        this.hp[this.n] = vl;
        let j = this.n, p = (this.n - 1) >> 1;
        while (j > 0 && this.compare(this.hp[p], this.hp[j])) {
            this.swap(j, p);
            j = p;
            p = (j - 1) >> 1;
        }
        this.n = this.hp.length;
    }

    isempty() {
        return this.n == 0;
    }

    top() {
        return this.n > 0 ? this.hp[0] : [-1, -1, -1];
    }

    pop() {
        this.n = this.n - 1;
        this.swap(0, this.n);
        this.heapify(0);
        this.hp.length = this.n;
    }
};


router.get("/feed/:id", async (req, res) => {
    try {
        const curheap = new Heap([]);
        const userFound = await User.findById(req.params.id);
        for(frie of userFound.friends) {
            console.log(frie['id']);
        }
        // for (frie of arr[req.params.id]['fr']) {
        //     const len = arr[frie]['ar'].length;
        //     if (len == 0) continue;
        //     curheap.push([arr[frie]['ar'][len - 1], len, frie]);
        // }
        // console.log(curheap.hp);
        // top 5
        const curlis = [];
        // while (curlis.length < 5 && !curheap.isempty()) {
        //     const x = curheap.top();
        //     curlis.push([x[0],x[2]]);
        //     curheap.pop();
        //     if (x[1] == 0) continue;
        //     x[1] -= 1;
        //     x[0] = arr[x[2]]['ar'][x[1] - 1];
        //     curheap.push(x);
        // }
        res.send(JSON.stringify(curlis));
    } catch (err) {
        res.send("Error " + err);
    }
});

module.exports = router;

