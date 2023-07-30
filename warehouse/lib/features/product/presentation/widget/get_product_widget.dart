import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:warehouse/core/util/snackbar_message.dart';
import 'package:warehouse/core/widget/elevated_button_widget.dart';
import 'package:warehouse/core/widget/loading_widget.dart';
import 'package:warehouse/features/product/data/model/product_model/product_model.dart';
import 'package:warehouse/features/product/presentation/bloc/product_bloc.dart';
import 'package:warehouse/injection_container.dart' as di;

import '../../../../core/theme.dart';

class GetProductWidget extends StatelessWidget {
  final String payment;
  final String product;

  GetProductWidget({super.key, required this.payment, required this.product});

  final PageController pageController = PageController(initialPage: 0);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) =>
          di.getIt<ProductBloc>()..add(ProductEvent.getProductEvent(product)),
      child: BlocConsumer<ProductBloc, ProductState>(
          listener: (context, state) {
            state.maybeWhen(
                orElse: () {},
                errorGetProductState: (message) {
                  SnackBarMessage().snackBarMessageError(context, message);
                },
              successReceiveProductState: (){
                 // Navigator.pushNamedAndRemoveUntil(context, '/EmployeePage', (route) => false);
                  SnackBarMessage().snackBarMessageSuccess(context, 'تم استلام المنتج');
              },
              errorReceiveProductState: (message){
                  SnackBarMessage().snackBarMessageError(context, message);
              }
            );
          },
          builder: (context, state) => state.maybeWhen(
              orElse: () => const Center(child: Text('No Data')),
              successGetProductState: (productModel) =>
                  _buildProduct(productModel, context),
              loading: () => const LoadingWidget())),
    );
  }

  Widget _buildProduct(ProductModel productModel, BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(5),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    productModel.user.name,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  CircleAvatar(
                    radius: 25,
                    backgroundImage: NetworkImage(productModel.user.photo),
                  ),
                ],
              ),
              const Divider(),
              Text(
                productModel.title,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 10,),
              Text(
                productModel.content,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(
                height: 10,
              ),
              ListView.separated(
                  shrinkWrap: true,
                  physics: const BouncingScrollPhysics(),
                  itemBuilder: (context, index) => Image(

                      image: NetworkImage(productModel.photos[index])),
                  separatorBuilder: (context, index) => const SizedBox(
                        height: 10,
                      ),
                  itemCount: productModel.photos.length),
              const SizedBox(
                height: 16,
              ),
              ElevatedButtonWidget(
                  onPressed: () {
                    BlocProvider.of<ProductBloc>(context)
                        .add(ProductEvent.receiveProductEvent(payment, 0));
                  },
                  row: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'تأكيد استلام القطعة',
                        style: Theme.of(context)
                            .textTheme
                            .bodyMedium!
                            .copyWith(color: Colors.white),
                      )
                    ],
                  )),
            ],
          ),
        ),
      ),
    );
  }
}