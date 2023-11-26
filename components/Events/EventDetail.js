import { Component } from "../../core/MiniReact.js"

export default class EventDetail extends Component {
  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<div
      class="content-center flex-wrap border shadow-sm pl-10 pr-20 rounded-xl border-solid border-black max-md:px-5"
    >
      <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div class="flex flex-col items-stretch w-[56%] max-md:w-full max-md:ml-0">
          <img
            loading="lazy"
            srcset="${this.props.eventDetails.imgDetail}"
            class="aspect-[1.6] object-contain object-center w-full self-stretch overflow-hidden mt-12 max-md:max-w-full max-md:mt-10"
          />
        </div>
        <div
          class="flex flex-col items-stretch w-[44%] ml-5 max-md:w-full max-md:ml-0"
        >
          <div
            class="items-center flex flex-col mt-7 pb-7 px-4 max-md:max-w-full max-md:mt-10"
          >
            <div
              class="text-blue-950 text-3xl font-bold leading-10 self-center whitespace-nowrap"
            >
              ${this.props.eventDetails.name}
            </div>
            <div
              class="grid w-full grid-cols-1 sm:grid-cols-2 mt-10 pr-11 max-md:pr-5"
            >
              <div class="flex justify-center sm:pb-1 pb-3">
                <div class="text-black text-sm font-bold leading-4 pr-3">Lieu</div>
                <div class="text-black text-sm leading-4 whitespace-nowrap">
                  ${this.props.eventDetails.place}
                </div>
              </div>
              <div class="flex justify-center sm:pb-1 pb-3">
                <div class="text-black text-sm font-bold leading-4 pr-3">Sport</div>
                <div class="text-black text-sm leading-4 whitespace-nowrap">
                  ${this.props.eventDetails.sport}
                </div>
              </div>
            </div>
            <div
              class="grid w-full grid-cols-1 sm:grid-cols-2 mt-10 pr-11 max-md:pr-5"
            >
              <div class="flex justify-center sm:pb-1 pb-3">
                <div class="text-black text-sm font-bold leading-4 pr-3">Adresse</div>
                <div
                  class="text-black text-sm leading-4 self-stretch whitespace-nowrap"
                >
                  ${this.props.eventDetails.address}
                </div>
              </div>
              <div class="flex justify-center sm:pb-1 pb-3">
                <div class="text-black text-sm font-bold leading-4 pr-3">Date</div>
                <div
                  class="text-black text-sm leading-4 self-stretch whitespace-nowrap"
                >
                  ${this.props.eventDetails.date}
                </div>
              </div>
            </div>
            <div
              class="text-black text-sm font-bold leading-4 self-stretch whitespace-nowrap mt-16 max-md:mt-10"
            >
              Description
            </div>
            <div class="text-black text-sm leading-4 self-stretch mt-4">
              ${this.props.eventDetails.description}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
}