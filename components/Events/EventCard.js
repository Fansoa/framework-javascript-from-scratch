import { Component } from "../../core/MiniReact.js"

export default class EventCard extends Component {
  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<div
    class="shadow-md bg-white flex grow flex-col items-stretch w-full mx-auto pb-7 rounded-md max-md:mt-8 hover:-translate-y-2 transition-all cursor-pointer"
  >
    <div
      class="rounded-t-xl bg-zinc-300 flex flex-col relative"
    >
      <span
        class="flex text-black text-center text-xs font-bold leading-5 whitespace-nowrap justify-center items-stretch bg-white max-w-full py-1 px-3 rounded-lg absolute top-2 left-2"
      >
        ${this.props.sportEvent.sport}
      </span>
      <img class="rounded-t-xl w-full h-48 object-cover object-center" src="${this.props.sportEvent.img}" alt="${this.props.sportEvent.sport}" />
    </div>
    <div
      class="flex w-[123px] max-w-full flex-col items-stretch ml-2.5 mt-7 self-start"
    >
      <div
        class="text-black text-base font-bold leading-5 underline whitespace-nowrap"
      >
        ${this.props.sportEvent.name}
      </div>
      <div class="text-black text-base leading-5 whitespace-nowrap mt-6">
        ${this.props.sportEvent.place}
      </div>
      <div class="text-black text-base leading-5 whitespace-nowrap mt-7">
        ${this.props.sportEvent.date}
      </div>
    </div>
    </div>`;
  }
}