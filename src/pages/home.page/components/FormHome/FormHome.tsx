import { FormComponent } from '../../../../components/FormComponent/FormComponent';

export const FormHome = () => {
  return (
    <section className="content content__grid">
      <div className="col-span-2 self-center sm:col-span-3
          md:col-start-2 md:col-span-4">
        <div className="flex flex-col gap-8">
          <h2 className="title--h2">Замовити консультацію</h2>
          <p className="title--body">Заповніть форму і ми зв’яжемося з вами найближчим часом</p>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-3 md:col-start-7 md:col-span-5">
        <FormComponent formVersion="consultation" />
      </div>
    </section>
  );
};
