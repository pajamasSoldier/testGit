import { expect, test } from 'vitest';
import { resourceLimits } from 'worker_threads';

test('addition operator', () => {
    const sum = (base: number, ...args: number[]): number => {
        let result = base * 10000;
        for (const num of args) {
            result += num;
        }
        return result;
    }

    const sum2 = (...args: number[]): number => {
        let result = 0;
        for (const num of args) {
            result += num;
        }
        return result;
    }

    const nums = [1, 10, 100, 1000];
    expect(sum2(...nums)).toBe(1111);
    //expect(sum2(nums[0],nums[1])).toBe(11); //なぜnumsをそのまま渡せないのか？→(...nums)で可変長配列で指示するべき

    type User = { name: string, age: number};
    //const getName = ( u: User): string => u.name;
    const users: User[]=[
        { name: "jon", age: 26},
        { name: "john", age: 42},
        { name: "ayumu", age: 36}
    ];
    const selectedUsers = users.filter((u: User) => u.age >= 30); //関数なので条件指定で取り出したいデータが配列から取り出せる→また配列に入れ直す
    const [first, secend] = users; //各個のデータを変数として取得するので、コールバック関数と同じことをしようとするともう一文必要→firstやsecondは変数なので下のように取り出し方に違いが出る

    expect(selectedUsers[1].age).toBe(36);
    expect(first.age).toBe(26);

    //関数の演習問題
    let message :string = "";
    const multipleOf15 :string[] = [];
    function getFizzBuzzString(i: number) {
        if (i % 3 ===0 && i % 5 === 0) {
            message = "FizzBuzz";
        } else if (i % 3 === 0) {
            message = "Fizz";
        } else if (i % 5 === 0) {
            message = "Buzz";
        } else {
            message = String(i);
        }
    }
    /*
    for (let i= 1; i <= 100; i++) {
        getFizzBuzzString(i);
        multipleOf15.push(message);
    }

    expect(multipleOf15[14]).toBe("FizzBuzz");
    */

    //sequence関数
    function sequence(start: number, end: number): number[]{
        const result: number[] = [];
        for (let i = start; i <= end; i++){
            result.push(i);
        }
        return result;
    }
    for(const i of sequence(1, 100)){
        getFizzBuzzString(i);
        multipleOf15.push(message);
    }
    expect(multipleOf15[13]).toBe("14");

    //クラス式の練習
    const User1 = class {
        constructor(public name: string, public age: number){}
        public isAdult(): boolean {
            return this.age >= 20;
        }
    };
    const uhyo = new User1('uhyo', 26);
    expect(uhyo.isAdult()).toBe(true);

    //型引数を持つクラス
    class User2<T> {
        name: string;
        #age: number;
        readonly data: T;

        constructor(name: string, age: number, data: T){
            this.name = name;
            this.#age = age;
            this.data = data;
        }

        public isAdult(): boolean {
            return this.#age >= 20;
        }
    }
    const urano = new User2<string>('urano', 26, '追加データ');
    const data = urano.data;
});


